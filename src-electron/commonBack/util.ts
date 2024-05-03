import fs from 'fs';
import { reject } from 'lodash';
import path from 'path';
import { PythonShell } from 'python-shell';

//#region FILE_STATUS_CODE
export const FILE_STATUS_CODE = {
  OK: 1,
  NOTFOUND: 11,
  ACCESSDENIED: 12,
  ALREADYEXISTS: 13,
  PERMISSIONERROR: 14,
  NOTDIRECTORY: 15,
  NOTEMPTY: 16,
} as const;

export type FILE_STATUS_CODE =
  (typeof FILE_STATUS_CODE)[keyof typeof FILE_STATUS_CODE];

export const fileStatusMsg: Map<FILE_STATUS_CODE, string> = new Map([
  [FILE_STATUS_CODE.OK, 'SUCCESS'],
  [FILE_STATUS_CODE.NOTFOUND, 'Not Found'],
  [FILE_STATUS_CODE.ACCESSDENIED, 'Access Denied'],
  [FILE_STATUS_CODE.ALREADYEXISTS, 'Already Exists'],
  [FILE_STATUS_CODE.PERMISSIONERROR, 'Permission Error'],
  [FILE_STATUS_CODE.NOTDIRECTORY, 'Not Directory'],
  [FILE_STATUS_CODE.NOTEMPTY, 'Not Tempty'],
]);

export function isFileExists(filePath: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return resolve(false);
      } else {
        return resolve(true);
      }
    });
  });
}

export function writeFile(destPath: string, data: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.writeFile(path.join(destPath), data, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(true);
      }
    });
  });
}

export function createFolder(folderPath: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(true);
      }
    });
  });
}

export function mergePaths(...paths: string[]): string {
  return path.join(...paths);
}

export function readJson(srcPath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(srcPath, (err, data) => {
      if (err) {
        return reject('');
      }
      return resolve(JSON.parse(data.toString()));
    });
  });
}

export function dbcToJson(filePath: string): Promise<any> {
  return new Promise<any>((resolve) => {
    PythonShell.run('dbcHandler.py', {
      mode: 'text',
      pythonPath: 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(process.cwd(), 'common/python'),
      args: [filePath],
    })
      .then((res) => {
        return resolve(res.at(0));
      })
      .catch((err) => {
        return reject(err);
      });
  });
}
