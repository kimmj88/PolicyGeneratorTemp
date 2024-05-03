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
  API_BUSRULEVALUE,
  RequestDeleteBusRuleValue,
  RequestGetBusRuleValue,
  RequestPostBusRuleValue,
  RequestUpdateBusRuleValue,
  ResponseLoadBusRuleValue,
} from 'common/apis';
import {
  select_busruleBYruletype_inner,
  where_busruleBYruletype_inner,
} from 'database/dynamicQuery';

import { BaseBusRuleValue } from 'common/class';

export async function getBusRuleValueService(
  reqParam: RequestGetBusRuleValue
): Promise<ResponseLoadBusRuleValue> {
  let busruleResponse: ResponseLoadBusRuleValue;
  let _busrules: BaseBusRuleValue[] = [];
  try {
    const queryString: Param = {
      busrule_key: reqParam.busrulevalue_key?.toString() || '',
      policy_key: reqParam.policy_key?.toString() || '',
      dbcref_key: reqParam.dbcref_key?.toString() || '',
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    _busrules = await excuteDynamic(
      select_busruleBYruletype_inner,
      where_busruleBYruletype_inner,
      configParam
    );

    busruleResponse = {
      busrules: _busrules,
      message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      row_count: _busrules.length,
    };

    return busruleResponse;
  } catch (err: any) {
    busruleResponse = {
      busrules: _busrules,
      message: err.message,
      row_count: _busrules.length,
    };
    return busruleResponse;
  }
}

export function createBusRuleValueService(
  reqParam: RequestPostBusRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      policy_key: reqParam.policy_key.toString(),
      dbcref_key: reqParam.dbcref_key.toString(),
      ruletype_key: reqParam.ruletype_key.toString(),
      value: reqParam.value,
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_BUSRULEVALUE, configParam, TRANSACTION_TYPE.INSERT)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function deleteBusRuleValueService(
  reqParam: RequestDeleteBusRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      busrulevalue_key: reqParam.busrulevalue_key.toString(),
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_BUSRULEVALUE, configParam, TRANSACTION_TYPE.DELETE)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export function updateBusRuleValueService(
  reqParam: RequestUpdateBusRuleValue
): Promise<any> {
  return new Promise((resolve, reject) => {
    const paramString: Param = {
      busrulevalue_key: reqParam.busrulevalue_key.toString(),
    };

    const queryString: Param = {
      value: reqParam.value,
    };
    const configParam: ConfigParam = {
      reqQeruy: queryString,
      reqBody: paramString,
    };

    excuteTransaction(API_BUSRULEVALUE, configParam, TRANSACTION_TYPE.UPDATE)
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
