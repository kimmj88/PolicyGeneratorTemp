<template>
  <div class="col column q-ma-xs">
    <q-virtual-scroll class="col" :items="busRules" v-slot="{ item }">
      <q-item :key="item.id" v-ripple="false" dense>
        <q-item-section side top>
          <q-checkbox v-model="ruleValues" :val="item" :ref="(el) => ruleItems[item.id] = el" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.description }}</q-item-label>

          <div class="q-ma-xs" v-if="item.id === 'LH' && isIncludeOption(item.id)">
            <q-input v-model="optionValues[item.id].value" filled dense :rules="optionRules"
              :ref="(el) => optionRefs[item.id] = el" />
          </div>

          <div class="q-ma-xs" v-if="item.id === 'LL' && isIncludeOption(item.id)">
            <q-input v-model="optionValues[item.id].value" filled dense :rules="optionRules"
              :ref="(el) => optionRefs[item.id] = el" />
          </div>
        </q-item-section>

      </q-item>
    </q-virtual-scroll>

    <div class="row justify-end q-mt-md">
      <q-btn class="col-1" size="sm" color="primary" label="Save" @click="onClickedSave" :key="saveKey" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { tryOnMounted } from '@vueuse/core';
import { BaseBusRuleValue } from 'common/class/rule/ruleValue/busRuleValue';
import { BusRuleOption, busRules } from 'common/definition';
import { QCheckbox, QInput, QList } from 'quasar';
import { ref } from 'vue';
import { _ } from 'boot';
import { BusRuleValueParam, DbcRef, ruleManager } from 'common/class';
import { useBusRuleValueStore, useDbcRelationStore } from 'stores';
import { storeToRefs } from 'pinia';
import { API_BUSRULEVALUE, API_BUSRULEVALUE_SET, RequestGetBusRuleValue, RequestPostSetBusRuleValue, ResponseLoadBusRuleValue } from 'common/apis/busRuleValue';
import { getData, getUrl, putData } from 'common/apis/common';
import { openAlert } from 'common/popup';
import { postBodyData } from 'common/apis';

//#region properties

interface OptionValue {
  [key: string]: {
    value: string;
  }
}

interface OptionRef {
  [key: string]: QInput | null
}

const saveKey = ref<number>(0);

const dbcRelationStore = useDbcRelationStore();
const busRuleValueStore = useBusRuleValueStore();

const { currentDbcRelation } = storeToRefs(dbcRelationStore);
const { busRuleValues } = storeToRefs(busRuleValueStore);

const ruleValues = ref<BusRuleOption[]>([]);
const ruleItems = ref({});
const optionValues = ref<OptionValue>({});
const optionRefs = ref<OptionRef>({});

tryOnMounted(() => {
  // init value
  busRules.forEach(rule => {
    if (rule.isValue) {
      optionValues.value[rule.id] = { value: '' };
    }
  });

  loadBusRuleValues();
});

//#endregion

//#region event functions

const onClickedSave = () => {
  const refs = optionRefs.value as any;
  if (!_.some(refs, (optionRef: QInput) => {
    optionRef?.validate();
    if (optionRef?.hasError) {
      return true;
    }
  })) {
    saveBuseRuleValues();
  };
};

//#endregion

//#region custom functions

const loadBusRuleValues = () => {
  const url = getUrl(API_BUSRULEVALUE);
  getData<RequestGetBusRuleValue, ResponseLoadBusRuleValue>(url, {
    dbcref_key: currentDbcRelation.value?.dbcref_key || 0
  }).then((res) => {
    if (res.status == 200) {
      const busRules = ruleManager.createInstanceBusRules(res.data.busrules);
      busRuleValueStore.setBusRuleValue(busRules);

      initBusRuleValues();
    }
  });
}

const saveBuseRuleValues = () => {
  let saveBusRuleValues: BaseBusRuleValue[] = [];
  const ruleValueOptions: BusRuleValueParam[] = ruleValues.value.map(rule => {
    let ruleValueOption: BusRuleValueParam = {
      class: '',
      value: ''
    };
    if (rule.isValue) {
      if (optionValues.value[rule.id]) {
        ruleValueOption['value'] = optionValues.value[rule.id].value;
      }
    }
    ruleValueOption['class'] = rule.class;
    return ruleValueOption;
  });

  saveBusRuleValues = ruleManager.createBusRuleValues(currentDbcRelation.value, ruleValueOptions);

  let url = getUrl(API_BUSRULEVALUE_SET);
  postBodyData<RequestPostSetBusRuleValue>(url, {
    dbcref_key: currentDbcRelation.value?.dbcref_key || 0,
    busrulevalues: saveBusRuleValues
  }).then((res) => {
    if (res.status == 200 || res.status == 201) {
      openAlert({
        content: 'Bus rule settings have been successfully saved.'
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
  }).finally(() => saveKey.value++);
}

const initBusRuleValues = () => {
  busRuleValues.value.forEach(ruleValue => {
    const ruleType = busRules.find((rule) => {
      return rule.id === ruleValue.sub_type;
    })
    if (ruleType) {
      ruleValues.value.push(ruleType);

      const optionValue = ruleValue.getValue();
      if (optionValue && optionValues.value[ruleType.id]) {
        optionValues.value[ruleType.id].value = optionValue as string;
      }
    }
  });
}

const isIncludeOption = (id): boolean => {
  return _.some(ruleValues.value, (rule) => rule.id === id);
}

const validateOption = (value) => {
  if (!_.isEmpty(value)) {
    return true;
  }
  return 'Please type a value';
};

const optionRules = [validateOption];
//#endregion

</script>

<style></style>
