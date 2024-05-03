import { BaseBusRuleValue, RuleSet, RuleValue } from 'common/class';
import { _ } from 'boot';

export class DbcRuleSet implements RuleSet {
  protected dbcref_key?: number;

  private busRules?: BaseBusRuleValue[];

  constructor(dbcref_key: number) {
    this.dbcref_key = dbcref_key;
  }

  public hasValues() {
    return false;
  }

  public getDbcRefKey() {
    return this.dbcref_key;
  }

  public addRuleValue(ruleValue: RuleValue) {
    return;
  }

  public addRuleValues(ruleValues: RuleValue[]) {
    return;
  }

  public getRuleValues(): RuleValue[] {
    return [];
  }

  public setBusRuleValue(ruleValue: RuleValue[]) {
    this.busRules = ruleValue as BaseBusRuleValue[];
  }
}
