import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetRuleType,
  ResponseLoadRuleType,
  API_RULETYPE,
} from 'common/apis';
import { getRuleTypeService } from 'service';
import { RuleType } from 'common/class';

export class RuleTypeController extends BaseRouter {
  constructor() {
    super(`/${API_RULETYPE}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getRuleType);
  }

  getRuleType = async (
    req: Request,
    res: Response<ResponseLoadRuleType>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetRuleType = {
        ruletype_key: Number(req.query.ruletype_key),
      };
      const ruleTypes: RuleType[] = await getRuleTypeService(reqParam);

      const result: ResponseLoadRuleType = {
        ruleTypes: ruleTypes,
        row_count: ruleTypes.length,
        message:
          ruleTypes.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };
}
