//#region URL

import { BaseBusRuleValue } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_BUSRULEVALUE = 'busrulevalue';
export const BUSRULE_KEY = ':busrulevalue_key';
export const API_BUSRULEVALUE_SET = 'busrulevalue/set';

//#endregion

//#region Requst

export interface RequestGetBusRuleValue {
  busrulevalue_key?: number;
  policy_key?: number;
  dbcref_key?: number;
}

export interface RequestPostBusRuleValue {
  policy_key: number;
  dbcref_key: number;
  ruletype_key: number;
  value: string;
}

export interface RequestPostSetBusRuleValue {
  dbcref_key: number;
  busrulevalues: BaseBusRuleValue[];
}

export interface RequestDeleteBusRuleValue {
  busrulevalue_key: number;
}

export interface RequestUpdateBusRuleValue {
  busrulevalue_key: number;
  value: string;
}

//#endregion

//#region Response

export interface ResponseLoadBusRuleValue extends ResponseGet {
  busrules: BaseBusRuleValue[];
}

//#endregion
