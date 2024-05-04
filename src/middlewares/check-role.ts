import { type Request, type Response, type NextFunction } from 'express';
import { AccessControlPolicy } from '@/enums/roles.enum';
import { HttpForbiddenError } from '@/lib/errors';

export const checkRole = <
  P extends Record<string, string> = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
  Locals extends Record<string, any> = any,
>(
  policy: AccessControlPolicy,
  roles: string[]
) => {
  return async (
    req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
    res: Response<ResBody, Locals>,
    next: NextFunction
  ) => {
    try {
      let isAuthorized = false;
      const role = res.locals.payload.role as string;
      switch (policy) {
        case AccessControlPolicy.ALLOW:
          if (roles.includes(role)) {
            isAuthorized = true;
          }
          break;

        case AccessControlPolicy.DENY:
          if (!roles.includes(role)) {
            isAuthorized = true;
          }
          break;

        case AccessControlPolicy.NEUTRAL:
          isAuthorized = true;
          break;
      }

      if (!isAuthorized) {
        throw new HttpForbiddenError(
          `You are not authorized to access this resource`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
