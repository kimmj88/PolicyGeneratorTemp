import { RuleValue } from 'common/class';
import { _ } from 'boot';

export interface BaseMessageRuleValueDto {
  busrulevalue_key?: number;
  policy_key?: number;
  dbcref_key?: number;
  messagerule_id?: number;
  ruletype_key?: number;
  sub_type?: string;
  value?: string | number;
}

export class BaseMessageRuleValue implements RuleValue {
  public messagerulevalue_key?: number;
  public policy_key?: number;
  public dbcref_key?: number;
  public messagerule_id?: number;
  public ruletype_key?: number;
  public sub_type?: string;

  public value?: string | number;

  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    this.dbcref_key = dbcref_key;
    this.policy_key = policy_key;
    this.ruletype_key = ruletype_key;
  }

  isValidate(): boolean {
    return true;
  }

  setValue(value: string | number): void {
    this.value = value;
  }

  getValue(): string | number | undefined {
    return this.value;
  }

  stringify(): string {
    return JSON.stringify(this);
  }

  public getBusRuleKey(): number {
    return this.messagerulevalue_key || 0;
  }
}

