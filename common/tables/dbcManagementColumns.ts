import { QTableProps } from 'quasar';

export const dbcManagementColumns: QTableProps['columns'] = [
  { name: 'seq', label: '#', field: 'seq', align: 'center' },
  {
    name: 'name',
    label: 'NAME',
    field: 'name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'time',
    label: 'TIME',
    field: 'creation_dttm',
    align: 'center',
    sortable: true,
  },
  { name: 'action', label: 'ACTION', field: 'action', align: 'center' },
];
