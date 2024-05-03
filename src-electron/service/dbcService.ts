import { excuteTransaction, TRANSACTION_TYPE } from 'database/database';
import {
  Param,
  ConfigParam,
  isFileExists,
  writeFile,
  dbcToJson,
  mergePaths,
  createFolder,
  FILE_STATUS_CODE,
  fileStatusMsg,
  COMMON_ERROR_CODE,
  errorMsg,
  settings,
} from 'commonBack';
import {
  API_DBC,
  RequestGetDbc,
  RequestPostDbc,
  RequestDeleteDbc,
  RequestPutDbc,
} from 'common/apis';
import { Dbc, DbcRaw } from 'common/class';
import { v4 as uuidv4 } from 'uuid';
import { appSettings, ROOT_PATH } from 'common/etc';

export function getDbcService(reqParam: RequestGetDbc): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      dbc_key: reqParam.dbc_key.toString(),
      name: reqParam.name,
    };
    const configParam: ConfigParam = { reqQeruy: queryString };
    excuteTransaction(API_DBC, configParam, TRANSACTION_TYPE.SELECT)
      .then(async (rows) => {
        const dbcs: Dbc[] = [];
        for (const row of rows) {
          const dbc: Dbc = new Dbc({
            dbc_key: row.dbc_key,
            name: row.name,
            path: row.path,
            status: row.status,
            creation_dttm: row.creation_dttm,
          });

          dbcs.push(dbc);
        }
        return resolve(dbcs);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export async function setDbcService(reqParam: RequestPostDbc): Promise<any> {
  try {
    if (!reqParam.path) {
      throw new Error(
        `${errorMsg.get(COMMON_ERROR_CODE.NO_INPUT_PARAMETER)} : dbc path`
      );
    }

    const exists = await isFileExists(reqParam.path);
    if (!exists) {
      throw new Error(fileStatusMsg.get(FILE_STATUS_CODE.NOTFOUND));
    }

    const result = await dbcToJson(reqParam.path);
    const dbcRaw = new DbcRaw();
    dbcRaw.parse(result);

    const destPath: string = mergePaths(
      appSettings.getValue(ROOT_PATH),
      settings.workingfolder.dbc,
      uuidv4()
    );

    const destFilePath: string = mergePaths(destPath, `${reqParam.name}.json`);

    const isCreateFolder: boolean = await createFolder(destPath);
    if (!isCreateFolder) {
      throw new Error(errorMsg.get(COMMON_ERROR_CODE.NO_CREATE_FOLDER));
    }

    const writeFileResult = await writeFile(
      destFilePath,
      JSON.stringify(dbcRaw, null, 2)
    );
    if (!writeFileResult) {
      throw new Error(fileStatusMsg.get(FILE_STATUS_CODE.NOTFOUND));
    }

    const queryString: Param = {
      name: reqParam.name,
      path: destFilePath,
    };

    const configParam: ConfigParam = { reqQeruy: queryString };
    const transactionResult = await excuteTransaction(
      API_DBC,
      configParam,
      TRANSACTION_TYPE.INSERT
    );

    return transactionResult;
  } catch (err) {
    throw err;
  }
}

export function deleteDbcService(reqParam: RequestDeleteDbc): Promise<any> {
  return new Promise((resolve, reject) => {
    const queryString: Param = {
      dbc_key: reqParam.dbc_key.toString(),
    };
    const configParam: ConfigParam = { reqQeruy: queryString };

    excuteTransaction(API_DBC, configParam, TRANSACTION_TYPE.DELETE)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function updateDbcService(reqParam: RequestPutDbc): Promise<any> {
  return new Promise((resolve, reject) => {
    const paramString: Param = {
      dbc_key: reqParam.dbc_key?.toString() || '',
    };

    const queryString: Param = {
      name: reqParam.name,
    };
    const configParam: ConfigParam = {
      reqQeruy: queryString,
      reqBody: paramString,
    };

    excuteTransaction(API_DBC, configParam, TRANSACTION_TYPE.UPDATE)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
