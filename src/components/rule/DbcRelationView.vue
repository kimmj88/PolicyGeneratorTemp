<template>
  <div class="col column q-pa-sm bg-grey-2">
    <q-card class="col column justify-between">
      <q-card-section class="col column">
        <q-table class="col my-sticky-header-column-table" flat virtual-scroll :columns="dbcRelationColumns"
          :rows="dbcRelations" v-model:pagination="pagination" hide-pagination>
          <template v-slot:no-data="{ }">
            <div class="full-width row flex-center">
              <span> No datas </span>
            </div>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-icon name="more_vert">
                <!-- <q-menu touch-position context-menu> -->
                <q-menu touch-position>
                  <q-list dense>
                    <q-item style="min-width: 130px" clickable v-close-popup @click="onClickedRuleSetting(props.row)">
                      <q-item-section> Rule Setting </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="onClickedDelete(props.row)">
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-td>
          </template>

          <template v-slot:body-cell-dbc_name="props">
            <q-td :props="props">
              <q-btn class="text-blue" flat rounded @click="onClickedName(props.row)" no-caps>
                {{ props.value }}
              </q-btn>
            </q-td>
          </template>

          <template v-slot:body-cell-seq="props">
            <q-td :props="props">
              {{ onSlotBodySeq(props) }}
            </q-td>
          </template>

          <template v-slot:body-cell-creation_dttm="props">
            <q-td :props="props">
              {{ onSlotBodyTime(props.row.creation_dttm) }}
            </q-td>
          </template>
        </q-table>
        <div class="row justify-center q-mb-md">
          <q-pagination v-model="pagination.page" color="grey-8" :max="pagesNumber" size="md" direction-links />
        </div>
      </q-card-section>
    </q-card>

    <q-card-section class="column items-end" style="padding: 8px; padding-right: 0px; padding-bottom: 0px">
      <q-btn class="col" size="sm" color="primary" label="Add DBC" @click="onClickedAddDbc" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { dbcRelationColumns } from 'common/tables';
import { tryOnMounted, useDateFormat } from '@vueuse/core';
import { useDbcRelationStore, usePolicyStore } from 'stores';
import { storeToRefs } from 'pinia';
import { openAlert, openPopup } from 'common/popup';
import { DbcRelationAdd, DbcRuleManagement } from 'components/rule';
import { ALERT_TYPE } from 'common/enum';
import { API_DBCREF, API_RULESET, RequestDeleteDbcRef, RequestGetDbcRef, RequestGetRuleSet, ResponseLoadDbcRef, ResponseLoadRuleSet, deleteData, getData, getUrl } from 'common/apis';
import { DbcRef } from 'common/class';

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
}

//#region properties
const props = defineProps<Props>();

const dbcRelationStore = useDbcRelationStore();
const policyStore = usePolicyStore();

const { dbcRelations } = storeToRefs(dbcRelationStore);
const { currentPolicy } = storeToRefs(policyStore);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
});

const pagesNumber = computed(() => {
  return Math.ceil(dbcRelations.value.length / pagination.value.rowsPerPage);
});

//#endregion

//#region event functions

tryOnMounted(() => {
  loadDbcRelations();
});

const onSlotBodySeq = (value) => {
  return value.rowIndex + 1;
};

const onSlotBodyTime = (value) => {
  return useDateFormat(new Date(value), 'YYYY/MM/DD HH:MM:ss').value;
};

const onClickedAddDbc = () => {
  openPopup({
    title: 'Add Relation DBC',
    width: 600,
    component: DbcRelationAdd,
    onOk(res) {
      loadDbcRelations();
    },
  });
};

const onClickedName = (row) => {
  dbcRelationStore.setCurrentDbcRelation(row);
  openPopup({
    title: 'Update DBC Relation',
    width: 600,
    component: DbcRelationAdd,
    componentProps: {
      isNew: false
    },
    onOk() {
      loadDbcRelations();
    },
    onDismiss() {
      dbcRelationStore.clearDbcRelation();
    }
  });
};

const onClickedRuleSetting = (row: DbcRef) => {
  dbcRelationStore.setCurrentDbcRelation(row);
  openPopup({
    title: 'Rule Setting',
    width: 1000,
    height: 600,
    component: DbcRuleManagement,
    componentProps: {},
    onDismiss() {
      dbcRelationStore.clearDbcRelation();
    }
  });
};

const onClickedDelete = (item: DbcRef) => {
  openAlert({
    type: ALERT_TYPE.YES_NO,
    content: 'Are you sure you want to remove this relation?',
    onOk: () => {
      // check has rule values
      let url = getUrl(API_RULESET);
      getData<RequestGetRuleSet, ResponseLoadRuleSet>(url, {
        dbcref_key: item.dbcref_key
      }).then((res) => {
        if (res.status == 200) {
          if (res.data.row_count > 0) {
            openAlert({
              content: 'The DBC relation cannot be deleted because already contains rule information.\nPlease remove the rule information and try again.'
            });
          } else {
            deleteDbcRelation(item.dbcref_key);
          }
        }
      });
    }
  });
};

//#endregion

//#region custom functions

const loadDbcRelations = () => {
  const url = getUrl(API_DBCREF);
  getData<RequestGetDbcRef, ResponseLoadDbcRef>(url, {
    policy_key: currentPolicy.value?.policy_key || 0
  }).then((res) => {
    if (res.status == 200) {
      dbcRelationStore.setDbcRelations(res.data.dbcRefs);
    }
  });
};

const deleteDbcRelation = (dbcref_key: number) => {
  const url = getUrl(API_DBCREF);
  deleteData<RequestDeleteDbcRef>(url, {
    dbcref_key: dbcref_key
  }).then((res) => {
    openAlert({
      content: 'The relation has been successfully removed.',
    });
    loadDbcRelations();
    return;
  }).catch(e => {
    openAlert({
      content: `An error occurred during the task\n\nReason: \n${e.message}`,
    });
  });
}

//#endregion
</script>

<style lang="sass">
.my-sticky-header-column-table
  max-height: 100%

  tr th
    position: sticky
    z-index: 2
    background: #ffffff

  thead tr:last-child th
    top: 48px
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  tbody
    scroll-margin-top: 48px
</style>
