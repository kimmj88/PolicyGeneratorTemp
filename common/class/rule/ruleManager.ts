import {
  API_RULETYPE,
  ResponseLoadRuleType,
  getData,
  getUrl,
} from 'common/apis';
import { DbcRef, RuleType, RuleValue } from 'common/class';
import { _ } from 'boot';
import { BaseBusRuleValue, busRuleValueMap } from './ruleValue/busRuleValue';

interface MessageRuleValueMapKey {
  [key: string]: RuleType;
}

interface SignalRuleValueMapKey {
  [key: string]: RuleType;
}

const ruleTypeMap = {
  DataLengthMessageRuleValue: {
    type: 'MSG',
    sub_type: 'DL',
  },
  AnomalyCycleMessageRuleValue: {
    type: 'MSG',
    sub_type: 'AC',
  },
};

export interface BusRuleValueParam {
  class: string;
  value: string;
}

export class RuleManager {
  ruleTypes: RuleType[];

  messageRuleValues: MessageRuleValueMapKey;
  signalRuleValues: SignalRuleValueMapKey;

  constructor() {
    this.ruleTypes = [];
    this.messageRuleValues = {};
    this.signalRuleValues = {};

    this.requestRuleType();
  }

  private requestRuleType() {
    const url = getUrl(API_RULETYPE);
    getData<ResponseLoadRuleType>(url).then((res) => {
      if (res.status == 200) {
        this.ruleTypes = res.data.ruleTypes;

        this.ruleTypes.forEach((rule) => {
          if (rule.type == 'MSG') {
            const ruleKey = _.keys(ruleTypeMap).find(
              (key) =>
                ruleTypeMap[key].type == rule.type &&
                ruleTypeMap[key].sub_type == rule.sub_type
            );
            this.messageRuleValues[ruleKey as string] = rule;
          } else {
            this.signalRuleValues[rule.name as string] = rule;
          }
        });
      }
    });
  }

  /**
   * Bus rule value 를 생성하는 함수
   * @param dbcref_key
   * @param options
   * @returns
   */
  public createBusRuleValues(
    dbcref?: DbcRef,
    options?: BusRuleValueParam[]
  ): BaseBusRuleValue[] {
    const busRulesValues: BaseBusRuleValue[] = [];
    if (!options || !dbcref) {
      return busRulesValues;
    }
    options.forEach((option) => {
      if (busRuleValueMap[option.class]) {
        const ruleValue: BaseBusRuleValue = new busRuleValueMap[option.class](
          dbcref.dbcref_key,
          dbcref.policy_key
        );
        if (option.value) {
          ruleValue.setValue(option.value);
        }
        busRulesValues.push(ruleValue);
      }
    });
    return busRulesValues;
  }

  public createInstanceBusRules(dtoDatas: BaseBusRuleValue[]) {
    let busRules: BaseBusRuleValue[] = [];
    busRules = dtoDatas.map((busRule) => {
      return Object.assign(
        new BaseBusRuleValue(
          busRule.dbcref_key || 0,
          busRule.policy_key || 0,
          busRule.ruletype_key || 0
        ),
        {
          ...busRule,
        }
      );
    });
    return busRules;
  }

  public getRuleValueId(ruletype_key: number) {
    return this.ruleTypes.find((type) => {
      return type.ruletype_key === ruletype_key;
    });
  }
}

export const ruleManager = new RuleManager();
