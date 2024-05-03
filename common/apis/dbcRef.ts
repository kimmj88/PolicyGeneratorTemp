//#region URL

import { DbcRef } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_DBCREF = 'dbcref';

//#endregion

//#region Requst
export interface RequestGetDbcRef {
  dbcref_key?: number;
  policy_key?: number;
}

export interface RequestPostDbcRef {
  policy_key: number;
  dbc_key: number;
  bus_number: number;
}

export interface RequestPutDbcRef {
  policy_key: number;
  dbc_key: number;
  bus_number: number;
}

export interface RequestDeleteDbcRef {
  dbcref_key?: number;
  policy_key?: number;
}

//#endregion

//#region Response

export interface ResponseLoadDbcRef extends ResponseGet {
  dbcRefs: DbcRef[];
}

//#endregion
