<template>
  <div class="col column q-pa-sm bg-grey-2">
    <q-card class="col column justify-between">
      <q-card-section class="col column">
        <q-table class="col my-sticky-header-column-table" flat virtual-scroll :columns="tableColumns" :rows="dbcs"
          v-model:pagination="pagination" :selection="selectionType" v-model:selected="selected" hide-pagination
          row-key="dbc_key" dense>
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
                    <q-item clickable v-close-popup @click="onClickedDelete(props.row)">
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-td>
          </template>

          <template v-if="selectionType === 'none'" v-slot:body-cell-name="props">
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
      <q-btn v-if="selectionType === 'none'" class="col" size="sm" color="primary" label="New" @click="onClickedNew" />
      <q-btn v-else class="col" size="sm" color="primary" label="Add" @click="onClickedAdd" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDbcStore } from 'stores';
import { computed, ref } from 'vue';
import { dbcManagementColumns } from 'common/tables';
import { tryOnMounted, useDateFormat } from '@vueuse/core';
import { openAlert, openPopup } from 'common/popup';
import { DbcAdd } from 'components/management/dbc';
import { API_DBC, ResponseLoadDbc, deleteData, getData, getUrl, RequestDeleteDbc } from 'common/apis';
import { _ } from 'boot';
import { ALERT_TYPE } from 'common/enum';

interface Props {
  onDialogHide: () => void;
  onDialogOK: (payload) => void;
  selectionType: 'multiple' | 'single' | 'none' | undefined;
}

//#region properties
const props = withDefaults(defineProps<Props>(), {
  selectionType: 'none'
});

const dbcStore = useDbcStore();

const { dbcs } = storeToRefs(dbcStore);

const tableColumns = ref(dbcManagementColumns);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
});

const selected = ref([]);

const pagesNumber = computed(() => {
  return Math.ceil(dbcs.value.length / pagination.value.rowsPerPage);
});

//#endregion

//#region event functions

tryOnMounted(() => {
  loadDbcs();

  if (props.selectionType != 'none') {
    tableColumns.value = tableColumns.value?.filter(item => {
      return item.field != 'action';
    })
  }
});

const onClickedName = (row) => {
  dbcStore.setCurrentDbc(row);
  openPopup({
    title: 'Update DBC',
    width: 350,
    component: DbcAdd,
    componentProps: {
      isNew: false
    },
    onOk() {
      loadDbcs();
    },
    onDismiss() {
      dbcStore.clearDbc();
    }
  });
};

const onSlotBodySeq = (value) => {
  return value.rowIndex + 1;
};

const onSlotBodyTime = (value) => {
  return useDateFormat(new Date(value), 'YYYY/MM/DD HH:MM:ss').value;
};

const onClickedNew = () => {
  openPopup({
    title: 'Add DBC',
    width: 350,
    component: DbcAdd,
    componentProps: {},
    onOk() {
      loadDbcs();
    },
  });
  return;
};

const onClickedAdd = () => {
  if (selected.value.length == 0) {
    openAlert({
      content: 'Please select a dbc.',
    });
    return;
  }
  props.onDialogOK(selected.value);
  return;
};

const onClickedDelete = (item) => {
  openAlert({
    type: ALERT_TYPE.YES_NO,
    content: 'Are you sure you want to remove this dbc?',
    onOk: () => {
      const url = getUrl(API_DBC);
      deleteData<RequestDeleteDbc>(url, {
        dbc_key: item.dbc_key
      }).then((res) => {
        openAlert({
          content: 'The dbc has been successfully removed.',
        });
        loadDbcs();
        return;
      }).catch(e => {
        openAlert({
          content: `An error occurred during the task\n\nReason: \n${e.message}`,
        });
      });
    }
  });
  return;
};

//#endregion

//#region custom functions

const loadDbcs = () => {
  const url = getUrl(API_DBC);
  getData<ResponseLoadDbc>(url).then((res) => {
    if (res.status == 200) {
      dbcStore.setDbcs(res.data.dbcs);
    }
  });
};

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
