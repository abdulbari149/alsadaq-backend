import { type Request } from 'express';
import { type PaginationParams } from '@/types/common.type';

const paginationParams = <
  ResBody extends object = Record<string, string>,
  ReqBody extends object = Record<string, string>,
  P = Record<string, string>,
  ReqQuery extends {
    page?: string | undefined;
    limit?: string | undefined;
  } = {
    page?: string | undefined;
    limit?: string | undefined;
  },
  Locals extends Record<string, unknown> = Record<string, unknown>,
>(
  req: Request<P, ResBody, ReqBody, ReqQuery, Locals>
): PaginationParams => {
  let page = Number(req.query?.page ?? '1');

  if (!req.query.page || isNaN(page)) {
    page = 1;
  }

  let limit = Number(req.query?.limit ?? '10');

  if (!req.query.limit || isNaN(limit)) {
    limit = 10;
  }

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};

export default paginationParams;
