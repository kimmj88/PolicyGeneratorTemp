import {
  RequestGetRuleSet,
  RequestGetBusRuleValue,
  RequestGetDbcRef,
  ResponseLoadDbcRef,
  ResponseLoadBusRuleValue,
} from 'common/apis';
import { getDbcRefService } from './dbcRefService';
import { RuleSet, DbcRuleSet } from 'common/class';

import { getBusRuleValueService } from './busRuleValueService';
import { excuteDynamic } from 'database/database';
import { select_ruleset_count } from 'database/dynamicQuery';

export function getRuleSetService(reqParam: RequestGetRuleSet): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const dbcrefs: ResponseLoadDbcRef = await getDbcRefService({
        policy_key: reqParam.policy_key,
        dbcref_key: reqParam.dbcref_key,
      } as RequestGetDbcRef);

      const rulesets: RuleSet[] = [];

      for (const row of dbcrefs.dbcRefs) {
        const setItem = new DbcRuleSet(row.dbcref_key);

        const busrules: ResponseLoadBusRuleValue = await getBusRuleValueService(
          {
            dbcref_key: row.dbcref_key,
          } as RequestGetBusRuleValue
        );

        setItem.setBusRuleValue(busrules.busrules);
        rulesets.push(setItem);
      }

      return resolve(rulesets);
    } catch (err: any) {
      return reject(err);
    }
  });
}

export function getRuleSetCount(reqParam: RequestGetRuleSet): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const excuteQuery: string = select_ruleset_count.replace(
        '$dbcref_key',
        reqParam.dbcref_key?.toString()
      );
      const object: any = await excuteDynamic(excuteQuery);

      return resolve(object[0].total_count);
    } catch (err: any) {
      return reject(err);
    }
  });
}
