<template>
  <div class="col column q-pa-sm bg-grey-2">
    <q-card class="col column justify-between">
      <q-card-section class="col column">
        <q-table class="col my-sticky-header-column-table" flat virtual-scroll :columns="policyManagementColumns"
          :rows="policies" v-model:pagination="pagination" hide-pagination dense>
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
                  <q-list v-if="props.row.protocol_type === 'CAN'" dense>
                    <q-item style="min-width: 130px" clickable v-close-popup @click="onClickedDBCSetting(props.row)">
                      <q-item-section> DBC Setting </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="onClickedDelete(props.row)">
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                  <q-list v-if="props.row.protocol_type === 'ETH'" dense>
                    <q-item clickable v-close-popup @click="onClickedDelete(props.row)">
                      <q-item-section> Delete </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-td>
          </template>

          <template v-slot:body-cell-name="props">
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
      <q-btn class="col" size="sm" color="primary" label="New" @click="onClickedNew" />
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { tryOnMounted, useDateFormat } from '@vueuse/core';
import { _ } from 'boot';
import { API_POLICY, RequestDeletePolicy, ResponseLoadPolicy, deleteData, getData, getUrl } from 'common/apis';
import { openAlert, openPopup } from 'common/popup';
import { policyManagementColumns } from 'common/tables';
import { storeToRefs } from 'pinia';
import { usePolicyStore } from 'stores';
import { PolicyAdd } from 'components/management/policy';
import { computed, ref } from 'vue';
import { ALERT_TYPE } from 'common/enum';
import { Policy } from 'common/class';
import { DbcRelationView } from 'components/rule';

interface Props {
  onDialogHide: () => void;
  onDialogOK: () => void;
}

//#region properties
const props = defineProps<Props>();

const policyStore = usePolicyStore();

const { policies } = storeToRefs(policyStore);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
});

const pagesNumber = computed(() => {
  return Math.ceil(policies.value.length / pagination.value.rowsPerPage);
});

//#endregion

//#region event functions

tryOnMounted(() => {
  loadPolicies();
});

const onClickedName = (row: Policy) => {
  policyStore.setPolicy(row);
  openPopup({
    title: 'Update Policy',
    width: 350,
    component: PolicyAdd,
    componentProps: {
      isNew: false
    },
    onOk() {
      loadPolicies();
    },
    onDismiss() {
      policyStore.clearPolicy();
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
    title: 'Add Policy',
    width: 350,
    component: PolicyAdd,
    componentProps: {},
    onOk() {
      loadPolicies();
    },
  });
};

const onClickedDelete = (item: Policy) => {
  openAlert({
    type: ALERT_TYPE.YES_NO,
    content: 'Are you sure you want to remove this policy?',
    onOk: () => {
      const url = getUrl(API_POLICY);
      deleteData<RequestDeletePolicy>(url, {
        policy_key: item.policy_key
      }).then((res) => {
        openAlert({
          content: 'The policy has been successfully removed.',
        });
        loadPolicies();
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

const onClickedDBCSetting = (row: Policy) => {
  policyStore.setPolicy(row);
  openPopup({
    title: 'DBC Setting',
    width: 1000,
    height: 600,
    component: DbcRelationView,
    componentProps: {},
    onDismiss() {
      policyStore.clearPolicy();
    }
  });
};

//#endregion

//#region custom functions

const loadPolicies = () => {
  const url = getUrl(API_POLICY);
  getData<ResponseLoadPolicy>(url).then((res) => {
    if (res.status == 200) {
      policyStore.setPolicyDatas(res.data.policies);
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
