import {
  excuteTransaction,
  TRANSACTION_TYPE,
  excuteDynamic,
} from 'database/database';
import {
  Param,
  ConfigParam,
  databaseMsg,
  DATABASE_STATUS_CODE,
} from 'commonBack';
import {
  API_MESSAGERULEVALUE,
  RequestDeleteMessageRuleValue,
  RequestGetMessageRuleValue,
  RequestPostMessageRuleValue,
  RequestUpdateMessageRuleValue,
  ResponseLoadMessageRuleValue,
} from 'common/apis';
import {
  select_messageruleBYruletype_inner,
  where_messageruleBYruletype_inner
} from 'database/dynamicQuery';

import { BaseMessageRuleValue } from 'common/class';

export async function getMessageRuleValueService(
  reqParam: RequestGetMessageRuleValue
): Promise<ResponseLoadMessageRuleValue> {
  let messageruleResponse: ResponseLoadMessageRuleValue;
  let _messagerules: BaseMessageRuleValue[] = [];
  try {
    const queryString: Param = {
      messagerule_key: reqParam.messagerulevalue_key?.toString() || '',
      policy_key: reqParam.policy_key?.toString() || '',
      dbcref_key: reqParam.dbcref_key?.toString() || '',
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    _messagerules = await excuteDynamic(
      select_messageruleBYruletype_inner,
      where_messageruleBYruletype_inner
      ,
      configParam
    );

    messageruleResponse = {
      messagerules: _messagerules,
      message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      row_count: _messagerules.length,
    };

    return messageruleResponse;
  } catch (err: any) {
    messageruleResponse = {
      messagerules: _messagerules,
      message: err.message,
      row_count: _messagerules.length,
    };
    return messageruleResponse;
  }
}

export function createMessageRuleValueService(
  reqParam: RequestPostMessageRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      policy_key: reqParam.policy_key.toString(),
      dbcref_key: reqParam.dbcref_key.toString(),
      ruletype_key: reqParam.ruletype_key.toString(),
      messagerule_id: reqParam.messagerule_id.toString(),
      value: reqParam.value,
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_MESSAGERULEVALUE, configParam, TRANSACTION_TYPE.INSERT)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function deleteMessageRuleValueService(
  reqParam: RequestDeleteMessageRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      messagerulevalue_key: reqParam.messagerulevalue_key.toString(),
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_MESSAGERULEVALUE, configParam, TRANSACTION_TYPE.DELETE)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function updateMessageRuleValueService(
  reqParam: RequestUpdateMessageRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const paramString: Param = {
      messagerulevalue_key: reqParam.messagerulevalue_key.toString(),
    };

    const queryString: Param = {
      value: reqParam.value,
    };
    const configParam: ConfigParam = {
      reqQeruy: queryString,
      reqBody: paramString,
    };

    excuteTransaction(API_MESSAGERULEVALUE, configParam, TRANSACTION_TYPE.UPDATE)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
