import { app } from 'electron';
import path from 'path';
import pkg from 'package.json';

export const ROOT_PATH = 'rootPath';

interface SettingValue {
  key: string;
  value: string;
}

class Setting {
  private rootPath?: string;
  private appName?: string;
  constructor(option?) {
    this.appName = pkg.name;
    this.rootPath = path.join(app.getPath('appData'), this.appName || '');
    if (option) {
    }
  }

  public setValue(value: SettingValue | SettingValue[]) {
    let values: SettingValue[] = [];
    if (!Array.isArray(value)) {
      values = [value];
    }

    values.forEach((item) => {
      if (this[item.key]) {
        this[item.key] = item.value;
      }
    });
  }

  public getValue(key: string) {
    return this[key] || null;
  }
}

export const appSettings = new Setting();
