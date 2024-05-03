import { RuleValue } from 'common/class';
import { _ } from 'boot';

export interface BaseBusRuleValueDto {
  busrulevalue_key?: number;
  policy_key?: number;
  dbcref_key?: number;
  ruletype_key?: number;
  sub_type?: string;
  value?: string | number;
}

export class BaseBusRuleValue implements RuleValue {
  public busrulevalue_key?: number;
  public policy_key?: number;
  public dbcref_key?: number;
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
    return this.busrulevalue_key || 0;
  }
}

export class UnknownIdBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4001);
  }
}

export class LoadHighBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4002);
  }
}

export class LoadLowBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4003);
  }
}

export class DIAGMessageBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4004);
  }
}

export class DIAGAttackBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4005);
  }
}

export class UnknownDIAGBusRuleValue extends BaseBusRuleValue {
  constructor(dbcref_key: number, policy_key: number, ruletype_key: number) {
    super(dbcref_key, policy_key, ruletype_key || 4006);
  }
}

export const busRuleValueMap = {
  UnknownIdBusRuleValue,
  LoadHighBusRuleValue,
  LoadLowBusRuleValue,
  DIAGMessageBusRuleValue,
  DIAGAttackBusRuleValue,
  UnknownDIAGBusRuleValue,
};
