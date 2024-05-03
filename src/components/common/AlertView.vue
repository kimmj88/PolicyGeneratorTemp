<template>
  <div class="col column q-pt-sm q-px-sm bg-grey-2">
    <q-card class="column justify-between">
      <q-card-section class="col">
        <div class="text-body1" style="white-space: pre-wrap;">
          {{ content }}
        </div>
      </q-card-section>
    </q-card>

    <q-card-section v-if="props.type == ALERT_TYPE.YES_NO" class="col-1 row q-ma-sm q-gutter-xs justify-end"
      style="padding: 0px;">
      <q-btn autofocus class="col-2" size="sm" color="primary" label="Yes" @click="onClickedYes" />
      <q-btn class="col-2" size="sm" color="primary" label="No" @click="onClickedNo" />
    </q-card-section>

    <q-card-section v-else class="col-1 row q-ma-sm q-gutter-xs justify-end" style="padding: 0px;">
      <q-btn autofocus class="col-2" size="sm" color="primary" label="Ok" @click="onClickedYes" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">

import { ALERT_TYPE } from 'common/enum';

interface Props {
  onDialogHide: () => void,
  onDialogOK: () => void,
  content: string,
  type: ALERT_TYPE
}

const props = defineProps<Props>();

const onClickedYes = () => {
  props.onDialogOK();
}

const onClickedNo = () => {
  props.onDialogHide();
}

</script>

<style></style>
