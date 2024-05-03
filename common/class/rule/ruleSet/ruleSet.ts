import { RuleValue } from 'common/class';

export interface RuleSet {
  hasValues();
  addRuleValue(ruleValue: RuleValue);
  getRuleValues(): RuleValue[];
}
