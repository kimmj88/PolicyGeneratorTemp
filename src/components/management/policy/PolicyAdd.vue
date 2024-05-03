<template>
  <div class="col column q-pa-sm bg-grey-2 q-gutter-xs">
    <q-card class="col column justify-between">
      <q-card-section class="col">
        <q-form class="q-gutter-xs">
          <q-input autofocus outlined v-model="name" dense label="Name" :rules="nameRules" ref="nameRef" />
          <q-select outlined v-model="type" :options="protocols" input-debounce="0" label="Type" clearable dense
            :rules="typeRules" ref="typeRef" :readonly="props.isNew === false">
          </q-select>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card-section class="col-1 row q-gutter-xs justify-end" style="padding: 0px">
      <q-btn v-if="props.isNew === true" class="col-2" size="sm" color="primary" label="Save"
        @click.once="onClickedSave" :key="saveKey" />
      <q-btn v-else class="col-2" size="sm" color="primary" label="Update" @click.once="onClickedUpdate"
        :key="updateKey" />
      <q-btn class="col-2" size="sm" color="primary" label="Close" @click="onClickedClose" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { tryOnMounted } from '@vueuse/core';
import { _ } from 'boot';
import {
  API_POLICY,
  API_PROFILE,
  RequestGetProfile,
  RequestPostPolicy,
  RequestPutPolicy,
  ResponseLoadProfile,
  getData,
  getUrl,
  postData,
  putData,
} from 'common/apis';
import { openAlert } from 'common/popup';
import { storeToRefs } from 'pinia';
import { QInput, QSelect } from 'quasar';
import { usePolicyStore, useProfileStore } from 'stores';
import { ref } from 'vue';

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
  isNew: boolean;
}

//#region properties
const saveKey = ref<number>(0);
const updateKey = ref<number>(0);

const props = withDefaults(defineProps<Props>(), {
  isNew: true
});

const profileStore = useProfileStore();
const policyStore = usePolicyStore();
const { protocols } = storeToRefs(profileStore);
const { currentPolicy } = storeToRefs(policyStore);

const nameRef = ref<QInput>();
const typeRef = ref<QSelect>();

const type = ref<string>(((): string => {
  if (props.isNew) {
    return '';
  }
  return currentPolicy.value?.protocol_type || '';
})());
const name = ref<string>(((): string => {
  if (props.isNew) {
    return '';
  }
  return currentPolicy.value?.name || '';
})());

//#endregion

//#region event functions
tryOnMounted(() => {
  const url = getUrl(API_PROFILE);
  getData<RequestGetProfile, ResponseLoadProfile>(url, {
    section: 'PROTOCOL',
    entry: 'POLICY_TYPE',
  }).then((res) => {
    if (res.status == 200) {
      if (!_.isEmpty(res.data.profiles)) {
        profileStore.setProfile(res.data.profiles);
      }
    }
  })
});

const onClickedSave = async () => {
  nameRef.value?.validate();
  if (nameRef.value?.hasError) {
    return;
  }

  typeRef.value?.validate();
  if (typeRef.value?.hasError) {
    return;
  }

  const url = getUrl(API_POLICY);
  postData<RequestPostPolicy>(url, {
    protocol_type: type.value || '',
    name: name.value || '',
  }).then((res) => {
    if (!res.data.result) {
      openAlert({
        content: `An error occurred during the task\n\nReason: \n${res.data.message}`,
      });
      return;
    }
    openAlert({
      content: 'The policy has been successfully added.',
      onDismiss: () => {
        props.onDialogOK();
      }
    });
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task\n\nReason: \n${e.message}`,
    });
  }).finally(() => saveKey.value++);
};

const onClickedUpdate = () => {
  nameRef.value?.validate();
  if (nameRef.value?.hasError) {
    return;
  }

  const url = getUrl(API_POLICY, currentPolicy.value?.policy_key.toString() || '');
  putData<RequestPutPolicy>(url, {
    name: name.value || '',
  }).then((res) => {
    if (!res.data.result) {
      openAlert({
        content: `An error occurred during the task.\n\nReason: \n${res.data.message}`,
      });
      return;
    }
    openAlert({
      content: 'The policy has been successfully updated.',
      onDismiss: () => {
        props.onDialogOK();
      }
    });
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task.\n\nReason: \n${e.message}`,
    });
  }).finally(() => updateKey.value++);
}

const onClickedClose = () => {
  props.onDialogHide();
};

//#endregion

//#region custom functions

const validateName = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return 'Please type name';
};

const isEmpty = (value) => {
  if (value) {
    return true;
  }
  return 'Please select a type';
};

const nameRules = [validateName];
const typeRules = [isEmpty];

//#endregion
</script>

<style></style>
