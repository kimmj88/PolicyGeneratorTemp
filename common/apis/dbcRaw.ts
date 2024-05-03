import { ResponseGet } from 'common/apis';
import { DbcRaw } from 'common/class';

//#region URL

export const API_DBCRAW = 'dbcraw';

//#endregion

//#region Requst
export interface RequestGetDbcRaw {
  dbc_key: number;
}

export interface RequestPostDbcRaw {
  dbc_key: number;
}

//#endregion

//#region Response

export interface ResponseLoadDbcRaw extends ResponseGet {
  dbcRaws: DbcRaw[];
}

//#endregion
