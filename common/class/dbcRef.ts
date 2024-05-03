export interface DbcRefParam {
  dbcref_key: number;
  policy_key?: number;
  dbc_key?: number;
  bus_number?: number;
  dbc_name?: string;
  creation_dttm?: string;
}

export class DbcRef {
  dbcref_key: number;
  policy_key?: number;
  dbc_key?: number;
  bus_number?: number;
  dbc_name?: string;
  creation_dttm?: string;

  constructor(option?: DbcRefParam) {
    this.dbcref_key = option?.dbcref_key || 0;
    this.policy_key = option?.policy_key || 0;
    this.dbc_key = option?.dbc_key || 0;
    this.dbc_name = option?.dbc_name || '';
    this.bus_number = option?.bus_number || 0;
    this.creation_dttm = option?.creation_dttm || '';
  }
}
