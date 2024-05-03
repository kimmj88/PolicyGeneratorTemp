import { Policy } from 'common/class/policy';
import _ from 'lodash';
import { defineStore } from 'pinia';

export const usePolicyStore = defineStore('policy', {
  state: (): {
    policies: Policy[];
    currentPolicy: Policy | undefined;
  } => ({
    policies: [],
    currentPolicy: undefined,
  }),
  getters: {},
  actions: {
    setPolicyDatas(data: Policy[]) {
      this.policies = data;
    },
    addPolicy(data: Policy) {
      this.policies = _.concat(this.policies, data);
    },
    deletePolicy(data: Policy) {
      this.policies = _.filter(this.policies, (item: Policy) => {
        return item.policy_key != data.policy_key;
      });
    },
    setPolicy(data: Policy | undefined) {
      this.currentPolicy = data;
    },
    clearPolicy() {
      this.currentPolicy = undefined;
    },
  },
});
