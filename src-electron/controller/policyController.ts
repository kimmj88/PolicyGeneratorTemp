import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetPolicy,
  RequestPostPolicy,
  RequestDeletePolicy,
  RequestPutPolicy,
  ResponseLoadPolicy,
  ResponsePost,
  ResponsePut,
  ResponseDelete,
  API_POLICY,
  POLICY_KEY,
} from 'common/apis';

import {
  getPolicyService,
  setPolicyService,
  deletePolicyService,
  updatePolicyService,
} from 'service';
import { Policy } from 'common/class';

export class PolicyController extends BaseRouter {
  constructor() {
    super(`/${API_POLICY}`, Router());
    this.initalizeRoutes();
  }

  public initalizeRoutes() {
    this.router.get(this.path, this.getPolicy);
    this.router.post(this.path, this.createPolicy);
    this.router.delete(this.path, this.deletePolicy);
    this.router.put(`${this.path}/${POLICY_KEY}`, this.updatePolicy);
  }

  getPolicy = async (
    req: Request,
    res: Response<ResponseLoadPolicy>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetPolicy = {
        policy_key: Number(req.query.policy_key),
        protocol_type: req.query.protocol_type as string,
        name: req.query.name as string,
      };
      const policies: Policy[] = await getPolicyService(reqParam);

      const result: ResponseLoadPolicy = {
        policies: policies,
        row_count: policies.length,
        message:
          policies.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };

  createPolicy = async (
    req: Request,
    res: Response<ResponsePost>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestPostPolicy = {
        protocol_type: req.query.protocol_type as string,
        name: req.query.name as string,
      };
      const returnID: number = await setPolicyService(reqParam);
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

  deletePolicy = async (
    req: Request,
    res: Response<ResponseDelete>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestDeletePolicy = {
        policy_key: Number(req.query.policy_key),
      };
      const isExtend: boolean = await deletePolicyService(reqParam);

      const result: ResponseDelete = {
        result: isExtend,
        message: databaseMsg.get(DATABASE_STATUS_CODE.OK) as string,
      };
      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.ACCEPTED, error as string));
    }
  };

  updatePolicy = async (
    req: Request,
    res: Response<ResponsePut>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestPutPolicy = {
        policy_key: Number(req.params.policy_key),
        protocol_type: req.query.protocol_type as string,
        name: req.query.name as string,
      };
      const isExtend: boolean = await updatePolicyService(reqParam);

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
