import { _ } from 'boot';
import { BaseBusRuleValue } from 'common/class';
import { defineStore } from 'pinia';

export const useBusRuleValueStore = defineStore('busRuleValue', {
  state: (): {
    busRuleValues: BaseBusRuleValue[];
  } => ({
    busRuleValues: [],
  }),
  getters: {},
  actions: {
    setBusRuleValue(data: BaseBusRuleValue[]) {
      this.busRuleValues = data;
    },
    clearBusRuleValue() {
      this.busRuleValues = [];
    },
  },
});
