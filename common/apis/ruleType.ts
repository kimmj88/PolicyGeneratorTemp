//#region URL

import { RuleType } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_RULETYPE = 'ruletype';
export const RULETYPE_KEY = ':ruletype_key';

//#endregion

//#region Requst

export interface RequestGetRuleType {
  ruletype_key: number;
}

//#endregion

//#region Response

export interface ResponseLoadRuleType extends ResponseGet {
  ruleTypes: RuleType[];
}

//#endregion
