import { excuteTransaction, TRANSACTION_TYPE } from 'database/database';
import { Param, ConfigParam } from 'commonBack';
import { API_RULETYPE, RequestGetRuleType } from 'common/apis';

export function getRuleTypeService(reqParam: RequestGetRuleType): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      ruletype_key: reqParam.ruletype_key.toString(),
    };
    const configParam: ConfigParam = { reqQeruy: queryString };
    return resolve(
      excuteTransaction(API_RULETYPE, configParam, TRANSACTION_TYPE.SELECT)
    );
  });
}
