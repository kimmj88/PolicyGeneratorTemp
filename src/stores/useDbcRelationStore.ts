import { _ } from 'boot';
import { Dbc, DbcRef } from 'common/class';
import { defineStore } from 'pinia';

export const useDbcRelationStore = defineStore('dbcRelation', {
  state: (): {
    dbcRelations: DbcRef[];
    currentDbcRelation: DbcRef | undefined;
  } => ({
    dbcRelations: [],
    currentDbcRelation: undefined,
  }),
  getters: {},
  actions: {
    setDbcRelations(data: DbcRef[]) {
      this.dbcRelations = data;
    },
    setCurrentDbcRelation(data: DbcRef) {
      this.currentDbcRelation = data;
    },
    clearDbcRelation() {
      this.currentDbcRelation = undefined;
    },
  },
});
