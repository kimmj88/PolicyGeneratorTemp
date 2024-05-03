<template>
  <div class="col column q-pa-sm bg-grey-2">
    <q-card class="col column justify-between">
      <q-card-section class="col column" style="padding: 5px;">
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="left"
          narrow-indicator>
          <q-tab name="bus" label="BUS" />
          <q-tab name="message" label="MESSAGE" />
          <q-tab name="signal" label="SIGNAL" />
        </q-tabs>

        <q-separator class="q-my-xs" />

        <q-tab-panels v-model="tab" class="col column" style="" keep-alive>
          <q-tab-panel name="bus" class="col column" style="padding: 2px;">
            <DbcBusRuleSettingView />
          </q-tab-panel>

          <q-tab-panel name="message" class="col column" style="padding: 2px;">
            <div class="text-h6 col text-center">MESSAGE</div>
          </q-tab-panel>

          <q-tab-panel name="signal" class="col column" style="padding: 2px;">
            <div class="text-h6 col text-center">SIGNAL</div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

    </q-card>
  </div>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { DbcBusRuleSettingView } from 'components/rule'

//#region properties

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
}

const props = defineProps<Props>();
const tab = ref<string>('bus');

//#endregion

//#region event functions
//#endregion

//#region custom functions
//#endregion

</script>

<style lang="sass">
</style>
