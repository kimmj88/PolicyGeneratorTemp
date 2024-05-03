<template>
  <div class="col column q-pa-sm bg-grey-2 q-gutter-xs">
    <q-card class="col column justify-between">
      <q-card-section class="col">
        <q-form class="q-gutter-xs">
          <div @click="onClickedDbc">
            <q-field outlined label="DBC" v-model="dbc" dense :rules="dbcRules" ref="dbcRef"
              @click="$emit('onClickedDbc')" clearable :readonly="isNew === false">
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{ dbc &&
            dbc?.name }}
                </div>
              </template>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-field>
          </div>
          <q-input outlined v-model="busNumber" dense label="Bus" type="number" :rules="nameRules" ref="nameRef" />
          <q-toggle v-if="isNew === true" label="Create basic rules" dense v-model="isBasic" />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card-section class="col-1 row q-gutter-xs justify-end" style="padding: 0px">
      <q-btn v-if="props.isNew === true" class="col-2" size="sm" color="primary" label="Add" @click.once="onClickedSave"
        :key="saveKey" />
      <q-btn v-else class="col-2" size="sm" color="primary" label="Update" @click.once="onClickedUpdate"
        :key="updateKey" />
      <q-btn class="col-2" size="sm" color="primary" label="Close" @click="onClickedClose" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { _ } from 'boot';
import { API_DBCRAW, API_DBCREF, RequestPostDbcRaw, RequestPostDbcRef, RequestPutDbcRef, ResponseLoadDbcRaw, getData, getUrl, postData, putData } from 'common/apis';
import { Dbc, DbcRaw, DbcRef } from 'common/class';
import { openAlert, openPopup } from 'common/popup';
import { DbcManagement } from 'components/management/dbc';
import { storeToRefs } from 'pinia';
import { QField, QInput } from 'quasar';
import { useDbcRelationStore, usePolicyStore } from 'stores';
import { ref } from 'vue';

interface dbcField {
  dbc_key: number;
  name: string;
}

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
  isNew: boolean;
}

//#region properties
const policyStore = usePolicyStore();
const { currentPolicy } = storeToRefs(policyStore);

const dbcRelationStore = useDbcRelationStore();
const { dbcRelations, currentDbcRelation } = storeToRefs(dbcRelationStore);

const props = withDefaults(defineProps<Props>(), {
  isNew: true
});

const nameRef = ref<QInput>();
const dbcRef = ref<QField>();

const busNumber = ref<number>(((): number => {
  if (props.isNew) {
    if (dbcRelations.value.length <= 0) {
      return 1;
    }
    const minDbcRef = _.maxBy(dbcRelations.value, (dbcRef: DbcRef) => dbcRef.bus_number);
    if (minDbcRef && minDbcRef.bus_number != undefined) {
      return minDbcRef.bus_number + 1 || 1;
    }
    return 1;
  }
  return currentDbcRelation.value?.bus_number || 1;
})());
const dbc = ref<dbcField>(((): dbcField => {
  if (props.isNew) {
    return {} as dbcField;
  }
  return {
    dbc_key: currentDbcRelation.value?.dbc_key,
    name: currentDbcRelation.value?.dbc_name || '',
  } as dbcField;
})());


const isBasic = ref<boolean>(false);

const saveKey = ref<number>(0);
const updateKey = ref<number>(0);

//#endregion

//#region event functions

const onClickedDbc = () => {
  if (props.isNew === false) {
    return;
  }

  openPopup({
    title: 'Select DBC',
    width: 800,
    height: 400,
    component: DbcManagement,
    componentProps: {
      selectionType: 'single'
    },
    onOk(res: Dbc[]) {
      if (res) {
        const item = _.first(res);
        if (item) {
          dbc.value = {
            dbc_key: item.dbc_key,
            name: item.name || ''
          };
        }
      }
    },
  });
}

const onClickedSave = () => {
  dbcRef.value?.validate();
  if (dbcRef.value?.hasError) {
    saveKey.value++;
    return;
  }
  nameRef.value?.validate();
  if (nameRef.value?.hasError) {
    saveKey.value++;
    return;
  }
  if (!validateSave()) {
    saveKey.value++;
    return;
  }

  let url = getUrl(API_DBCREF);
  postData<RequestPutDbcRef>(url, {
    policy_key: currentPolicy.value?.policy_key || 0,
    dbc_key: dbc.value.dbc_key,
    bus_number: busNumber.value
  }).then((res) => {
    if (res.status == 201) {
      openAlert({
        content: 'The DBC relation has been successfully added.',
        onDismiss: () => {
          props.onDialogOK();
        }
      });
    } else {
      openAlert({
        content: `An error occurred during the task\n\nReason: \n${res.data.message}`,
      });
    }
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task\n\nReason: \n${e.message}`,
    });
  }).finally(() => saveKey.value++);;
};

const onClickedUpdate = () => {
  nameRef.value?.validate();
  if (nameRef.value?.hasError) {
    updateKey.value++;
    return;
  }
  if (!validateSave()) {
    updateKey.value++;
    return;
  }
  let url = getUrl(API_DBCREF);
  putData<RequestPutDbcRef>(url, {
    policy_key: currentPolicy.value?.policy_key || 0,
    dbc_key: dbc.value.dbc_key,
    bus_number: busNumber.value
  }).then((res) => {
    if (res.status == 200) {
      openAlert({
        content: 'The DBC relation has been successfully updated.',
        onDismiss: () => {
          props.onDialogOK();
        }
      });
    }
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task\n\nReason: \n${e.message}`,
    });
  }).finally(() => updateKey.value++);
}

const onClickedClose = () => {
  props.onDialogHide();
};

//#endregion

//#region custom functions

const validateDbc = (value) => {
  if (value && value['dbc_key'] != undefined) {
    return true;
  }
  return 'Please select a dbc';
};

const validateName = (value) => {
  if (!_.isUndefined(value)) {
    // 1보다 작은 수
    if (value <= 0) {
      return 'The bus number is not valid.'
    }
    return true;
  }
  return 'Please type bus number';
};

const validateSave = () => {
  if (_.some(dbcRelations.value, (dbcRel: DbcRef) => {
    return dbcRel.bus_number == busNumber.value;
  })) {
    openAlert({
      content: 'Already registerd bus number.\nPlease input a different bus number.',
    });
    return false;
  }
  return true;
}

const dbcRules = [validateDbc];
const nameRules = [validateName];

//#endregion

</script>


<style></style>
