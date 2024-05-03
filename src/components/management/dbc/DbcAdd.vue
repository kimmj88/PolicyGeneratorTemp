<template>
  <div class="col column q-pa-sm bg-grey-2 q-gutter-xs">
    <q-card class="col column justify-between">
      <q-card-section class="col">
        <q-form class="q-gutter-xs">
          <q-file outlined dense v-model="file" standout :rules="fileRules" :filter="onValidateFile"
            @rejected="onRejected" @update:model-value="onChangeDbcFile" ref="fileRef"
            :readonly="props.isNew === false">
            <template v-slot:prepend>
              <q-icon name="attach_file" color="primary" @click="fileRef?.pickFiles" />
            </template>
            <template v-slot:append>
              <q-icon v-if="props.isNew === true" name="close" @click.stop.prevent="file == undefined"
                class="cursor-pointer" />
            </template>
          </q-file>
          <q-input autofocus outlined v-model="name" dense label="Name" :rules="nameRules" ref="nameRef" />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card-section class="col-1 row q-gutter-xs justify-end" style="padding: 0px">
      <q-btn v-if="props.isNew === true" class="col-2" size="sm" color="primary" label="Save"
        @click.once="onClickedSave" :key=saveKey />
      <q-btn v-else class="col-2" size="sm" color="primary" label="Update" @click.once="onClickedUpdate"
        :key=updateKey />
      <q-btn class="col-2" size="sm" color="primary" label="Close" @click="onClickedClose" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { _ } from 'boot';
import { API_DBC, RequestPostDbc, RequestPutDbc, getUrl, postData, putData } from 'common/apis';
import { openAlert } from 'common/popup';
import { storeToRefs } from 'pinia';
import { QFile, QInput, QSelect } from 'quasar';
import { useDbcStore } from 'stores';
import { ref } from 'vue';

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
  isNew: boolean;
}

//#region properties
const props = withDefaults(defineProps<Props>(), {
  isNew: true
});

const nameRef = ref<QInput>();
const fileRef = ref<QFile>();

const dbcStore = useDbcStore();
const { currentDbc } = storeToRefs(dbcStore);

const file = ref<File>(((): File => {
  if (props.isNew) {
    return new File([], '');
  }
  return new File([], currentDbc.value?.name || '');
})());
const name = ref<string>(((): string => {
  if (props.isNew) {
    return '';
  }
  return currentDbc.value?.name || '';
})());

const saveKey = ref<number>(0);
const updateKey = ref<number>(0);

//#endregion

//#region event functions


const onClickedSave = () => {
  nameRef.value?.validate();
  if (nameRef.value?.hasError) {
    return;
  }

  fileRef.value?.validate();
  if (fileRef.value?.hasError) {
    return;
  }

  const url = getUrl(API_DBC);
  postData<RequestPostDbc>(url, {
    name: name.value || '',
    path: file.value?.path || ''
  }).then((res) => {
    openAlert({
      content: 'The dbc has been successfully saved.',
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

  const url = getUrl(API_DBC, currentDbc.value?.dbc_key.toString() || '');
  putData<RequestPutDbc>(url, {
    name: name.value || '',
  }).then((res) => {
    openAlert({
      content: 'The dbc has been successfully updated.',
      onDismiss: () => {
        props.onDialogOK();
      }
    });
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task\n\nReason: \n${e.message}`,
    });
  }).finally(() => updateKey.value++);
};


const onChangeDbcFile = (value) => {
  const fileName = value.name.replace('.dbc', '');
  name.value = fileName;
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

const validateFile = (value) => {
  if (value) {
    return true;
  }
  return 'Please select a DBC file';
};

const nameRules = [validateName];
const fileRules = [validateFile];

const onValidateFile = (files) => {
  const regex = /(.dbc)/g;
  return _.filter(files, _file => regex.test(_file.name || ''));
};

const onRejected = () => {
  openAlert({
    content: 'Please check a file type (only dbc)',
  });
};

//#endregion
</script>

<style></style>
