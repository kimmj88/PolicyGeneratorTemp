import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  API_DBC,
  DBC_KEY,
  ResponsePost,
  ResponseDelete,
  ResponseLoadDbc,
  ResponsePut,
  RequestGetDbc,
  RequestPostDbc,
  RequestDeleteDbc,
  RequestPutDbc,
} from 'common/apis';
import { Dbc } from 'common/class';
import {
  getDbcService,
  setDbcService,
  deleteDbcService,
  updateDbcService,
} from 'service';

export class DbcController extends BaseRouter {
  constructor() {
    super(`/${API_DBC}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getDbc);
    this.router.post(this.path, this.createDbc);
    this.router.delete(this.path, this.deleteDbc);
    this.router.put(`${this.path}/${DBC_KEY}`, this.updateDbc);
  }

  getDbc = async (
    req: Request,
    res: Response<ResponseLoadDbc>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetDbc = {
        dbc_key: Number(req.query.dbc_key),
        name: req.query.name as string,
      };
      const _dbcs: Dbc[] = await getDbcService(reqParam);

      const result: ResponseLoadDbc = {
        dbcs: _dbcs,
        row_count: _dbcs.length,
        message:
          _dbcs.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };

  createDbc = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestPostDbc = {
        name: req.query.name as string,
        path: req.query.path as string,
      };
      const returnID: number = await setDbcService(reqParam);
      const result: ResponsePost = {
        lastID: returnID,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
        result: true,
      };
      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  deleteDbc = async (
    req: Request,
    res: Response<ResponseDelete>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestDeleteDbc = { dbc_key: Number(req.query.dbc_key) };
      const isExtend: boolean = await deleteDbcService(reqParam);

      const result: ResponseDelete = {
        result: isExtend,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error: any) {
      next(
        new HttpException(
          HTTP_STATUS_CODE.ACCEPTED,
          'Cannot delete from dbc table: dbc_key is referenced in dbcref table'
        )
      );
    }
  };

  updateDbc = async (
    req: Request,
    res: Response<ResponsePut>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestPutDbc = {
        dbc_key: Number(req.params.dbc_key),
        name: req.query.name as string,
      };
      const isExtend: boolean = await updateDbcService(reqParam);

      const result: ResponsePut = {
        result: isExtend,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };
}
