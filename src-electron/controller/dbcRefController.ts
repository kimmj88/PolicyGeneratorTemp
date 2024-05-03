import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  ResponseLoadDbcRef,
  API_DBCREF,
  RequestGetDbcRef,
  RequestPostDbcRef,
  RequestDeleteDbcRef,
  ResponsePost,
  ResponseDelete,
} from 'common/apis';
import {
  getDbcRefService,
  setDbcRefService,
  deleteDbcRefService,
} from 'service';

export class DbcRefController extends BaseRouter {
  constructor() {
    super(`/${API_DBCREF}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getDbcRefService);
    this.router.post(this.path, this.setDbcRef);
    this.router.delete(this.path, this.deleteDbcRef);
  }

  getDbcRefService = async (
    req: Request,
    res: Response<ResponseLoadDbcRef>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetDbcRef = {
        dbcref_key: Number(req.query.dbcref_key),
        policy_key: Number(req.query.policy_key),
      };
      const result: ResponseLoadDbcRef = await getDbcRefService(reqParam);

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };

  setDbcRef = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestPostDbcRef = {
        policy_key: Number(req.query.policy_key),
        dbc_key: Number(req.query.dbc_key),
        bus_number: Number(req.query.bus_number),
      };
      const result: ResponsePost = await setDbcRefService(reqParam);
      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  deleteDbcRef = async (
    req: Request,
    res: Response<ResponseDelete>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestDeleteDbcRef = {
        dbcref_key: Number(req.query.dbcref_key),
        policy_key: Number(req.query.policy_key),
      };
      const isExtend: boolean = await deleteDbcRefService(reqParam);

      const result: ResponseDelete = {
        result: isExtend,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(
        new HttpException(
          HTTP_STATUS_CODE.ACCEPTED,
          'Cannot delete from dbc table: dbc_key is referenced in dbcref table'
        )
      );
    }
  };
}
