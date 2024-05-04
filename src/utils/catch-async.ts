import { type NextFunction, type Request, type Response } from 'express';
import {
  type ApiResponse,
  type Handler,
  type Options,
} from '@/types/util.types';
import logger from '@/lib/logger';
import { type ApiLocals } from '@/types/common.type';

const catchAsync = <
  ResBody extends object = Record<string, string>,
  ReqBody extends object = Record<string, string>,
  Params = Record<string, string>,
  ReqQuery = qs.ParsedQs,
  Locals extends object = ApiLocals,
>(
  fn: Handler<Params, ResBody, ReqBody, ReqQuery, Locals>,
  options: Options<Params, ResBody, ReqBody, ReqQuery, Locals> = {}
) => {
  const { errorHandler } = {
    errorHandler: (
      error: unknown,
      _ctx: {
        req: Request<Params, ApiResponse<ResBody>, ReqBody, ReqQuery, Locals>;
        res: Response<ApiResponse<ResBody>, Locals>;
      }
    ) => {
      logger.error(error);
    },
    ...options,
  };
  return async (
    req: Request<
      Params,
      ApiResponse<ResBody> & { success: boolean },
      ReqBody,
      ReqQuery,
      Locals
    >,
    res: Response<ApiResponse<ResBody> & { success: boolean }, Locals>,
    next: NextFunction
  ) => {
    try {
      const { statusCode, ...data } = await fn(req, res);
      res.status(statusCode).json({
        ...data,
        success: true,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const promise = errorHandler(error, { req, res }) as Promise<void> | void;
      if (promise instanceof Promise) {
        await promise;
      }
      next(error);
    }
  };
};

export default catchAsync;
