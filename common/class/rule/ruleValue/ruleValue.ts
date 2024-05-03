export interface RuleValue {
  isValidate(): boolean;
  setValue(value: string | number): void;
  stringify(): string;
}
