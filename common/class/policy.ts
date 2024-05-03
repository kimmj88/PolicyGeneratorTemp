import { STATUS } from 'common/enum';

interface PolicyParam {
  policy_key: number;
  name?: string;
  creation_dttm?: string;
  protocol_type?: string;
  status?: STATUS;
}

export class Policy {
  policy_key: number;
  name?: string;
  creation_dttm?: string;
  protocol_type?: string;
  status?: STATUS;

  constructor(option: PolicyParam) {
    this.policy_key = option?.policy_key;
    this.name = option?.name;
    this.protocol_type = option?.protocol_type;
    this.creation_dttm = option?.creation_dttm;
    this.status = option?.status;
  }
}
