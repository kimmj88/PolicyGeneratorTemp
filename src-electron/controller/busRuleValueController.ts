import { NextFunction, Request, Response, Router } from 'express';
import { logger } from 'commonBack';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetBusRuleValue,
  RequestPostBusRuleValue,
  RequestDeleteBusRuleValue,
  RequestUpdateBusRuleValue,
  ResponseLoadBusRuleValue,
  ResponsePost,
  ResponseDelete,
  API_BUSRULEVALUE,
} from 'common/apis';
import {
  getBusRuleValueService,
  createBusRuleValueService,
  deleteBusRuleValueService,
  updateBusRuleValueService,
} from 'service';
import { BaseBusRuleValue } from 'common/class';
import { _ } from 'boot';

export class BusRuleValueController extends BaseRouter {
  constructor() {
    super(`/${API_BUSRULEVALUE}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getBusRuleValue);
    this.router.post(this.path, this.createBusRuleValue);
    this.router.post(`${this.path}/set`, this.SetBusRuleValue);
    this.router.delete(this.path, this.deleteBusRuleValue);
  }

  getBusRuleValue = async (
    req: Request,
    res: Response<ResponseLoadBusRuleValue>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetBusRuleValue = {
        busrulevalue_key: Number(req.query.busrule_key),
        policy_key: Number(req.query.policy_key),
        dbcref_key: Number(req.query.dbcref_key),
      };
      const busrules: ResponseLoadBusRuleValue = await getBusRuleValueService(
        reqParam
      );

      res.status(HTTP_STATUS_CODE.OK).json(busrules);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };

  createBusRuleValue = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    let resPost: ResponsePost;
    try {
      const reqParam: RequestPostBusRuleValue = {
        policy_key: Number(req.query.policy_key),
        dbcref_key: Number(req.query.dbcref_key),
        ruletype_key: Number(req.query.ruletype_key),
        value: req.query.value as string,
      };

      resPost = {
        lastID: await createBusRuleValueService(reqParam),
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
        result: true,
      };
      res.status(HTTP_STATUS_CODE.CREATED).json(resPost);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  SetBusRuleValue = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    const lastIDs: number[] = [];
    const updateIDs: number[] = [];
    const deleteIDs: number[] = [];
    try {
      const reqParams = req.body.busrulevalues;

      const originalItems: ResponseLoadBusRuleValue =
        await getBusRuleValueService({
          dbcref_key: req.body.dbcref_key,
        } as RequestGetBusRuleValue);

      const filterRemoveData: BaseBusRuleValue[] =
        originalItems.busrules.filter(
          (itemA: BaseBusRuleValue) =>
            !reqParams.some(
              (itemB) => itemB.busrulevalue_key === itemA.busrulevalue_key
            )
        );

      for (const row of filterRemoveData) {
        await deleteBusRuleValueService({
          busrulevalue_key: row.busrulevalue_key,
        } as RequestDeleteBusRuleValue);
        deleteIDs.push(row.busrulevalue_key || 0);
      }

      for (const row of reqParams) {
        if (row.busrulevalue_key != undefined) {
          await updateBusRuleValueService({
            busrulevalue_key: row.busrulevalue_key,
            policy_key: row.policy_key,
            dbcref_key: row.dbcref_key,
            ruletype_key: row.ruletype_key,
            value: row.value,
          } as RequestUpdateBusRuleValue);
          updateIDs.push(row.busrulevalue_key || 0);
        } else {
          const lastID: number = await createBusRuleValueService({
            policy_key: row.policy_key,
            dbcref_key: row.dbcref_key,
            ruletype_key: row.ruletype_key,
            value: row.value,
          } as RequestPostBusRuleValue);
          lastIDs.push(lastID);
        }
      }

      const result: ResponsePost = {
        lastID: lastIDs,
        updateID: updateIDs,
        deleteID: deleteIDs,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
        result: true,
      };

      res.status(HTTP_STATUS_CODE.CREATED).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  deleteBusRuleValue = async (
    req: Request,
    res: Response<ResponseDelete>,
    next: NextFunction
  ) => {
    try {
      const reqParams = JSON.parse(req.query.busrulevalue_keys as string);
      for (const key of Object.keys(reqParams.busrulevalue_keys)) {
        await createBusRuleValueService(reqParams.busrulevalue_keys[key]);
      }

      const result: ResponseDelete = {
        result: true,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(
        new HttpException(
          HTTP_STATUS_CODE.ACCEPTED,
          'Cannot delete from policy table: policy_key, dbcref_key is referenced in policy, dbcref table'
        )
      );
    }
  };
}
