import type { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

export type WhereOptions<T> = Partial<T>;

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
}

export type TransactionHandler<
  P,
  ResBody extends object,
  ReqBody extends object,
  ReqQuery = qs.ParsedQs,
  Locals extends object = Record<string, unknown>,
> = (
  db: PrismaClient,
  req: Request<P, ApiResponse<ResBody>, ReqBody, ReqQuery, Locals>,
  res: Response<ApiResponse<ResBody>, Locals>
) => Promise<ApiResponse<ResBody>>;

export type Handler<
  P,
  ResBody,
  ReqBody extends object,
  ReqQuery,
  Locals extends object,
> = (
  req: Request<P, ApiResponse<ResBody>, ReqBody, ReqQuery, Locals>,
  res: Response<ApiResponse<ResBody>, Locals>
) => Promise<
  ApiResponse<ResBody> & {
    statusCode: number;
  }
>;

export interface Context<
  P,
  ResBody extends object,
  ReqBody extends object,
  ReqQuery = qs.ParsedQs,
  Locals extends object = Record<string, unknown>,
> {
  req: Request<P, ApiResponse<ResBody>, ReqBody, ReqQuery, Locals>;
  res: Response<ApiResponse<ResBody>, Locals>;
}

export interface Options<
  P,
  ResBody extends object,
  ReqBody extends object,
  ReqQuery = qs.ParsedQs,
  Locals extends object = Record<string, unknown>,
> {
  errorHandler?: (
    error: unknown,
    ctx: Context<P, ResBody, ReqBody, ReqQuery, Locals>
  ) => void | Promise<void>;
}
