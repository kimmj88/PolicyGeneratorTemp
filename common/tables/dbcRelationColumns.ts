import { QTableProps } from 'quasar';

export const dbcRelationColumns: QTableProps['columns'] = [
  { name: 'seq', label: '#', field: 'seq', align: 'center' },
  {
    name: 'dbc_name',
    label: 'DBC NAME',
    field: 'dbc_name',
    align: 'center',
    sortable: true,
  },
  {
    name: 'bus',
    label: 'BUS',
    field: 'bus_number',
    align: 'center',
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
