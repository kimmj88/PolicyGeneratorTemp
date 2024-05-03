interface RuleTypeParam {
  ruletype_key: number;
  type?: string;
  sub_type?: string;
  name?: string;
}

export class RuleType {
  ruletype_key: number;
  type?: string;
  sub_type?: string;
  name?: string;

  constructor(option: RuleTypeParam) {
    this.ruletype_key = option?.ruletype_key;
    this.type = option?.type;
    this.sub_type = option?.sub_type;
    this.name = option?.name;
  }
}
