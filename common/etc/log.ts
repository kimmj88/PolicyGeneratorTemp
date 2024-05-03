export const LOG_TYPE = {
  LOG: 1,
  WARNING: 2,
  ERROR: 3,
} as const;

export type LOG_TYPE = (typeof LOG_TYPE)[keyof typeof LOG_TYPE];

const colorMap = {
  [LOG_TYPE.WARNING]: 'yellow',
  [LOG_TYPE.ERROR]: '#F48771',
};

export function backLog(content: string, type?: LOG_TYPE) {
  let message = '[BACK]';
  if (type) {
    message += LOG_TYPE.WARNING == type ? '[WARNING]' : '[ERROR]';
  }
  log(`${message}  ${content}`, type);
}

function log(content: string, type?: LOG_TYPE) {
  let color = '';
  if (type) {
    color = `color:${colorMap[type]}`;
  }
  console.log(`%c ${content}`, color);
}
