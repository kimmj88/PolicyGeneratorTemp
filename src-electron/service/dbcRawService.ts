import {
  readJson,
  errorMsg,
  COMMON_ERROR_CODE,
  databaseMsg,
  DATABASE_STATUS_CODE,
} from 'commonBack';
import { DbcRaw, Dbc } from 'common/class';
import {
  ResponseLoadDbcRaw,
  RequestGetDbcRaw,
  RequestGetDbc,
} from 'common/apis';
import { getDbcService } from 'service';

export async function getDbcJsonService(
  reqParam: RequestGetDbcRaw
): Promise<ResponseLoadDbcRaw> {
  let resDbcRaw: ResponseLoadDbcRaw;
  const dbcRaws: DbcRaw[] = [];
  try {
    if (!reqParam.dbc_key) {
      throw `${errorMsg.get(COMMON_ERROR_CODE.NO_INPUT_PARAMETER)} : dbc_key`;
    }

    const reqDbcParam: RequestGetDbc = {
      dbc_key: Number(reqParam.dbc_key),
      name: '',
    };
    const dbcs: Dbc[] = await getDbcService(reqDbcParam);

    if (dbcs.length === 0) {
      throw new Error(databaseMsg.get(DATABASE_STATUS_CODE.NODATA));
    }

    for (const row of dbcs) {
      const jsonData: string = await readJson(row.path || '');
      if (!jsonData) continue;
      const dbcRaw: DbcRaw = new DbcRaw({
        jsonObj: jsonData,
      });
      dbcRaws.push(dbcRaw);
    }

    resDbcRaw = {
      dbcRaws: dbcRaws,
      message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      row_count: dbcRaws.length,
    };

    return resDbcRaw;
  } catch (err: any) {
    const errMessage: string = err.message;
    resDbcRaw = {
      dbcRaws: dbcRaws,
      message: errMessage,
      row_count: 0,
    };
    return resDbcRaw;
  }
}
