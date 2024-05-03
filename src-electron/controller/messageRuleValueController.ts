import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetMessageRuleValue,
  ResponseLoadMessageRuleValue,
  API_MESSAGERULEVALUE,
  ResponsePost,
  RequestPostMessageRuleValue,
  ResponseDelete,
  RequestDeleteMessageRuleValue,
  RequestUpdateMessageRuleValue
} from 'common/apis';
import {
  createMessageRuleValueService,
  getMessageRuleValueService,
  deleteMessageRuleValueService,
  updateMessageRuleValueService,
} from 'service';
import { BaseMessageRuleValue } from 'common/class';
import { _ } from 'boot';

export class MessageRuleValueController extends BaseRouter {
  constructor() {
    super(`/${API_MESSAGERULEVALUE}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getMessageRuleValue);
    this.router.post(this.path, this.createMessageRuleValue);
    this.router.delete(this.path, this.deleteMessageRuleValue);
    this.router.post(`${this.path}/set`, this.SetMessageRuleValue);

  }

  getMessageRuleValue = async (
    req: Request,
    res: Response<ResponseLoadMessageRuleValue>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetMessageRuleValue = {
        messagerulevalue_key: Number(req.query.messagerulevalue_key),
        policy_key: Number(req.query.policy_key),
        dbcref_key: Number(req.query.dbcref_key),
      };
      const messagerules: ResponseLoadMessageRuleValue = await getMessageRuleValueService(
        reqParam
      );

      res.status(HTTP_STATUS_CODE.OK).json(messagerules);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };

  createMessageRuleValue = async (
    req: Request,
    res: Response<ResponsePost>,



    next: NextFunction
  ) => {
    let resPost: ResponsePost;
    try {
      const reqParam: RequestPostMessageRuleValue = {
        policy_key: Number(req.query.policy_key),
        dbcref_key: Number(req.query.dbcref_key),
        ruletype_key: Number(req.query.ruletype_key),
        messagerule_id: Number(req.query.messagerule_id),
        value: req.query.value as string,
      };

      resPost = {
        lastID: await createMessageRuleValueService(reqParam),
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
        result: true,
      };
      res.status(HTTP_STATUS_CODE.CREATED).json(resPost);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  deleteMessageRuleValue = async (
    req: Request,
    res: Response<ResponseDelete>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestDeleteMessageRuleValue = { messagerulevalue_key: Number(req.query.messagerulevalue_key) };
      await deleteMessageRuleValueService(reqParam);

      const result: ResponseDelete = {
        result: true,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(
        new HttpException(
          HTTP_STATUS_CODE.ACCEPTED,
          'Cannot delete from messagerulevalue table: policy_key, dbcref_key is referenced in policy, messagerulevalue table'
        )
      );
    }
  };

  SetMessageRuleValue = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    const lastIDs: number[] = [];
    const updateIDs: number[] = [];
    const deleteIDs: number[] = [];
    try {
      const reqParams = req.body.messagerulevalues;

      const originalItems: ResponseLoadMessageRuleValue =
        await getMessageRuleValueService({
          dbcref_key: req.body.dbcref_key,
        } as RequestGetMessageRuleValue);

      const filterRemoveData: BaseMessageRuleValue[] =
        originalItems.messagerules.filter(
          (itemA: BaseMessageRuleValue) =>
            !reqParams.some(
              (itemB) => itemB.messagerulevalue_key === itemA.messagerulevalue_key
            )
        );

      for (const row of filterRemoveData) {
        await deleteMessageRuleValueService({
          messagerulevalue_key: row.messagerulevalue_key,
        } as RequestDeleteMessageRuleValue);
        deleteIDs.push(row.messagerulevalue_key || 0);
      }

      for (const row of reqParams) {
        if (row.messagerulevalue_key != undefined) {
          await updateMessageRuleValueService({
            messagerulevalue_key: row.messagerulevalue_key,
            policy_key: row.policy_key,
            dbcref_key: row.dbcref_key,
            ruletype_key: row.ruletype_key,
            messagerule_id: row.messagerule_id,
            value: row.value,
          } as RequestUpdateMessageRuleValue);
          updateIDs.push(row.messagerulevalue_key || 0);
        } else {
          const lastID: number = await createMessageRuleValueService({
            policy_key: row.policy_key,
            dbcref_key: row.dbcref_key,
            ruletype_key: row.ruletype_key,
            value: row.value,
          } as RequestPostMessageRuleValue);
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
}