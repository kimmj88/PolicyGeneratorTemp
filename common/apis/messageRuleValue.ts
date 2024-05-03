//#region URL

import { BaseMessageRuleValue } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_MESSAGERULEVALUE = 'messagerulevalue';
export const MESSAVERULE_KEY = ':messagerulevalue_key';
export const API_MESSAGERULEVALUE_SET = 'messagerulevalue/set';

//#endregion

//#region Requst

export interface RequestGetMessageRuleValue {
  messagerulevalue_key?: number;
  policy_key?: number;
  dbcref_key?: number;
}

export interface RequestPostMessageRuleValue {
  policy_key: number;
  dbcref_key: number;
  ruletype_key: number;
  messagerule_id: number;
  value: string;
}

export interface RequestPostSetMessageRuleValue {
  dbcref_key: number;
  messageulevalues: BaseMessageRuleValue[];
}

export interface RequestDeleteMessageRuleValue {
  messagerulevalue_key: number;
}

export interface RequestUpdateMessageRuleValue {
  messagerulevalue_key: number;
  value: string;
}

//#endregion

//#region Response

export interface ResponseLoadMessageRuleValue extends ResponseGet {
  messagerules: BaseMessageRuleValue[];
}

//#endregion
