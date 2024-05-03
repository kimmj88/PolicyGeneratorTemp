//#region URL

import { Policy } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_POLICY = 'policy';
export const POLICY_KEY = ':policy_key';

//#endregion

//#region Requst

export interface RequestGetPolicy {
  policy_key: number;
  protocol_type: string;
  name: string;
}

export interface RequestPostPolicy {
  protocol_type: string;
  name: string;
}

export interface RequestPutPolicy {
  policy_key?: number;
  protocol_type?: string;
  name: string;
}

export interface RequestDeletePolicy {
  policy_key: number;
}

//#endregion

//#region Response

export interface ResponseLoadPolicy extends ResponseGet {
  policies: Policy[];
}

//#endregion
