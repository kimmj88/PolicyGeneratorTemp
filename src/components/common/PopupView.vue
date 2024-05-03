<template>
  <q-dialog class="" ref="dialogRef" persistent>
    <q-card class="column q-dialog-plugin bg-grey-2 layout-size">
      <q-card-section
        class="row bg-primary"
        style="padding: 8px; padding-left: 10px; height: 48px"
      >
        <div class="col text-white text-h6">
          {{ title }}
        </div>
        <q-btn
          class="col-1 q-pa-xs"
          icon="close"
          color="white"
          flat
          dense
          v-close-popup
        />
      </q-card-section>
      <q-card-section class="col column" style="padding: 0px">
        <bodyComponent
          :onDialogHide="onDialogHide"
          :onDialogOK="onDialogOK"
          :onDialogCancel="onDialogCancel"
          v-bind="bodyComponentProps"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

defineProps({
  title: String,
  width: {
    type: String,
    default: '400px',
  },
  height: String,
  bodyComponent: null,
  bodyComponentProps: null,
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();
</script>

<style lang="scss">
$popup-width: v-bind('width');
$popup-max-width: v-bind('width');
$popup-height: v-bind('height');

.layout-size {
  width: $popup-width;
  max-width: none !important;
  height: $popup-height;
}

.sticky-title {
  position: sticky;
  top: 0;
}
</style>
