//#region URL

import { Profile } from 'common/class';
import { ResponseGet } from 'common/apis';

export const API_PROFILE = 'profile';

//#endregion

//#region Requst
export interface RequestGetProfile {
  section: string;
  entry: string;
}

//#endregion

//#region Response

export interface ResponseLoadProfile extends ResponseGet {
  profiles: Profile[];
}

//#endregion
