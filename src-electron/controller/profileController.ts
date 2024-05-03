import { NextFunction, Request, Response, Router } from 'express';
import {
  HTTP_STATUS_CODE,
  DATABASE_STATUS_CODE,
  databaseMsg,
  HttpException,
  BaseRouter,
} from 'commonBack';
import {
  RequestGetProfile,
  ResponseLoadProfile,
  API_PROFILE,
} from 'common/apis';
import { getProfileService } from 'service';
import { Profile } from 'common/class';

export class ProfileController extends BaseRouter {
  constructor() {
    super(`/${API_PROFILE}`, Router());
    this.initalizeRoutes();
  }
  public initalizeRoutes() {
    this.router.get(this.path, this.getProfile);
  }

  getProfile = async (
    req: Request,
    res: Response<ResponseLoadProfile>,
    next: NextFunction
  ) => {
    try {
      const reqParam: RequestGetProfile = {
        section: req.query.section as string,
        entry: req.query.entry as string,
      };
      const profiles: Profile[] = await getProfileService(reqParam);

      const result: ResponseLoadProfile = {
        profiles: profiles,
        row_count: profiles.length,
        message:
          profiles.length === 0
            ? (databaseMsg.get(DATABASE_STATUS_CODE.NODATA) as string)
            : (databaseMsg.get(DATABASE_STATUS_CODE.OK) as string),
      };

      res.status(HTTP_STATUS_CODE.OK).json(result);
    } catch (error) {
      next(new HttpException(HTTP_STATUS_CODE.SERVER_ERR, error as string));
    }
  };
}
