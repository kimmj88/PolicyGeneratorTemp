//#region URL
import { ResponseGet } from 'common/apis';
import { Dbc } from 'common/class';

export const API_DBC = 'dbc';
export const DBC_KEY = ':dbc_key';

//#endregion

//#region Requst
export interface RequestGetDbc {
  dbc_key: number;
  name: string;
}

export interface RequestPostDbc {
  name: string;
  path: string;
}

export interface RequestDeleteDbc {
  dbc_key: number;
}

export interface RequestPutDbc {
  dbc_key?: number;
  name: string;
}
//#endregion

//#region Response

export interface ResponseLoadDbc extends ResponseGet {
  dbcs: Dbc[];
}

//#endregion
