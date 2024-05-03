import { _ } from 'boot';
import { Dbc } from 'common/class';
import { defineStore } from 'pinia';

export const useDbcStore = defineStore('dbc', {
  state: (): {
    dbcs: Dbc[];
    currentDbc: Dbc | undefined;
  } => ({
    dbcs: [],
    currentDbc: undefined,
  }),
  getters: {},
  actions: {
    setDbcs(data: Dbc[]) {
      this.dbcs = data;
    },
    addDbc(data: Dbc[]) {
      this.dbcs = _.concat(this.dbcs, data);
    },
    deleteDbc(data: Dbc) {
      this.dbcs = _.filter(this.dbcs, (item) => {
        return item.dbc_key != data.dbc_key;
      });
    },
    setCurrentDbc(data: Dbc) {
      this.currentDbc = data;
    },
    clearDbc() {
      this.currentDbc = undefined;
    },
  },
});
