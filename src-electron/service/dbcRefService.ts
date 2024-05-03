import {
  excuteTransaction,
  excuteDynamic,
  TRANSACTION_TYPE,
  dynamicQuery,
} from 'database/database';

import {
  select_dbcrefBYdbc_inner,
  where_dbcrefBYdbc_inner,
} from 'database/dynamicQuery';
import {
  Param,
  ConfigParam,
  COMMON_ERROR_CODE,
  errorMsg,
  databaseMsg,
  DATABASE_STATUS_CODE,
} from 'commonBack';
import {
  API_DBCREF,
  RequestGetDbcRef,
  RequestPostDbcRef,
  RequestDeleteDbcRef,
  ResponseLoadDbcRef,
  ResponsePost,
} from 'common/apis';
import { DbcRef } from 'common/class';

export async function getDbcRefService(
  reqParam: RequestGetDbcRef
): Promise<ResponseLoadDbcRef> {
  let dbcrefResponse: ResponseLoadDbcRef;
  let _dbcRefs: DbcRef[] = [];
  try {
    const queryString: Param = {
      dbcref_key: reqParam.dbcref_key?.toString() || '',
      policy_key: reqParam.policy_key?.toString() || '',
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    _dbcRefs = await excuteDynamic(
      select_dbcrefBYdbc_inner,
      where_dbcrefBYdbc_inner,
      configParam
    );

    dbcrefResponse = {
      dbcRefs: _dbcRefs,
      row_count: _dbcRefs.length,
      message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
    };

    return dbcrefResponse;
  } catch (err: any) {
    dbcrefResponse = {
      dbcRefs: _dbcRefs,
      message: err.message,
      row_count: _dbcRefs.length,
    };
    return dbcrefResponse;
  }
}

export async function setDbcRefService(
  reqParam: RequestPostDbcRef
): Promise<ResponsePost> {
  let responsePost: ResponsePost;

  try {
    if (!reqParam.policy_key || !reqParam.dbc_key) {
      throw `${errorMsg.get(
        COMMON_ERROR_CODE.NO_INPUT_PARAMETER
      )} : policy_key or dbc_key`;
    }

    const queryString: Param = {
      policy_key: reqParam.policy_key.toString(),
      dbc_key: reqParam.dbc_key.toString(),
      bus_number: reqParam.bus_number.toString(),
    };

    const configParam: ConfigParam = { reqQeruy: queryString };

    const returnID: number = await excuteTransaction(
      API_DBCREF,
      configParam,
      TRANSACTION_TYPE.INSERT
    );

    responsePost = {
      lastID: returnID,
      message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      result: true,
    };

    return responsePost;
  } catch (errMessage: any) {
    responsePost = { lastID: 0, message: errMessage, result: false };
    throw responsePost;
  }
}

export function deleteDbcRefService(
  reqParam: RequestDeleteDbcRef
): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      dbcref_key: reqParam.dbcref_key?.toString() || '',
      policy_key: reqParam.policy_key?.toString() || '',
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_DBCREF, configParam, TRANSACTION_TYPE.DELETE)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
