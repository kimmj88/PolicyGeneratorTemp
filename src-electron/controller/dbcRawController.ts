import { NextFunction, Request, Response, Router } from 'express';
import { BaseRouter, HTTP_STATUS_CODE, HttpException } from 'commonBack';
import { API_DBCRAW, ResponseLoadDbcRaw, RequestGetDbcRaw } from 'common/apis';
import { getDbcJsonService } from 'service';

export class DbcRawController extends BaseRouter {
  constructor() {
    super(`/${API_DBCRAW}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getDbcJson);
  }

  getDbcJson = async (
    req: Request,
    res: Response<ResponseLoadDbcRaw>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetDbcRaw = { dbc_key: Number(req.query.dbc_key) };
      const result: ResponseLoadDbcRaw = await getDbcJsonService(reqParam);

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };
}
