export const ALERT_TYPE = {
  OK: 1,
  YES_NO: 2,
} as const;

export type ALERT_TYPE = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];

export const STATUS = {
  N: 'N',
  D: 'D',
} as const;

export type STATUS = (typeof STATUS)[keyof typeof STATUS];
