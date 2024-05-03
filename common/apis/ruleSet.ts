//#region URL

import { RuleSet } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_RULESET = 'ruleset';

//#endregion

//#region Requst

export interface RequestGetRuleSet {
  policy_key?: number;
  dbcref_key: number;
}

//#endregion

//#region Response

export interface ResponseLoadRuleSet extends ResponseGet {
  RuleSets: RuleSet[];
}

//#endregion
