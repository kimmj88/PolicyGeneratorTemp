export interface DbcParam {
  dbc_key: number;
  name?: string;
  path?: string;
  status?: string;
  creation_dttm?: string;
}

/**
 * DBC Class
 */
export class Dbc {
  dbc_key: number;
  name?: string;
  path?: string;
  status?: string;
  creation_dttm?: string;

  constructor(option?: DbcParam) {
    this.dbc_key = option?.dbc_key || 0;
    this.name = option?.name || '';
    this.path = option?.path || '';
    this.status = option?.status || '';
    this.creation_dttm = option?.creation_dttm || '';
  }
}
