import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { type Request, type Response, type NextFunction } from 'express';
import { HttpBadRequestError } from '@/lib/errors';
import logger from '@/lib/logger';

export type RegistrationParamType = 'vendor' | 'reseller';

type DtoArg = {
  [key in RegistrationParamType]: Parameters<typeof RequestValidator.validate>;
};

export default class RequestValidator {
  static validate = <T>(
    classInstance: ClassConstructor<T>,
    key: 'body' | 'params' | 'query' = 'body'
  ) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const validationErrorText = 'Request validation failed!';
      try {
        const convertedObject = plainToInstance(classInstance, req[key]);
        const errors = await validate(
          convertedObject as Record<string, unknown>,
          {
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            whitelist: true,
          }
        );
        if (!errors.length) {
          next();
          return;
        }
        const rawErrors: string[] = [
          ...new Set([
            ...errors.flatMap((error) =>
              Object.values(error.constraints ?? [])
            ),
          ]),
        ];
        logger.error(rawErrors);
        next(new HttpBadRequestError(validationErrorText, rawErrors));
      } catch (e) {
        logger.error(e);
        next(new HttpBadRequestError(validationErrorText, [e.message]));
      }
    };
  };

  static validateRegisterDto = (arg: DtoArg) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const type = req.params.type as RegistrationParamType;
      await RequestValidator.validate(arg[type][0], arg[type][1])(
        req,
        res,
        next
      );
    };
  };
}
