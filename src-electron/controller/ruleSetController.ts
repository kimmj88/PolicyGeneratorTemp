import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetRuleSet,
  ResponseLoadRuleSet,
  API_RULESET,
} from 'common/apis';
import { getRuleSetService, getRuleSetCount } from 'service';
import { RuleSet } from 'common/class';

export class RuleSetController extends BaseRouter {
  constructor() {
    super(`/${API_RULESET}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getRuleSet);
  }

  getRuleSet = async (
    req: Request,
    res: Response<ResponseLoadRuleSet>,
    next: NextFunction
  ) => {
    let result: ResponseLoadRuleSet;
    try {
      const reqParam: RequestGetRuleSet = {
        policy_key: Number(req.query.policy_key),
        dbcref_key: Number(req.query.dbcref_key),
      };
      const ruleSets: RuleSet[] = await getRuleSetService(reqParam);

      result = {
        RuleSets: ruleSets,
        row_count: await getRuleSetCount(reqParam),
        message:
          ruleSets.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };
}
