export interface BusRuleOption {
  id: string;
  name: string;
  description: string;
  class: string;
  isValue?: boolean;
}

export const busRules: BusRuleOption[] = [
  {
    id: 'UAID',
    name: 'Unknown Arb Id',
    description: 'Arbitration ID is unknown',
    class: 'UnknownIdBusRuleValue',
  },
  {
    id: 'LH',
    name: 'Load High',
    description: 'The bus loads too high',
    isValue: true,
    class: 'LoadHighBusRuleValue',
  },
  {
    id: 'LL',
    name: 'Load Low',
    description: 'The bus loads too low',
    isValue: true,
    class: 'LoadLowBusRuleValue',
  },
  {
    id: 'DMU',
    name: 'Unknown DIAG Id',
    description: 'DIAG Message is unknown',
    class: 'DIAGMessageBusRuleValue',
  },
  {
    id: 'DMI',
    name: 'DIAG Message Invalid',
    description: 'DIAG Message is invalid',
    class: 'DIAGAttackBusRuleValue',
  },
  {
    id: 'DAD',
    name: 'DOS Attack Detect',
    description: 'DOS attack detect',
    class: 'UnknownDIAGBusRuleValue',
  },
];
