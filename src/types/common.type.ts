import { type User } from '@prisma/client';
import { type Response } from 'express';

type Send<ResBody = any, T = Response<ResBody>> = (body?: {
  message: string;
  data: ResBody;
}) => T;

export interface CustomResponse<T> extends Response {
  json: Send<T, this>;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface ApiLocals {
  payload: JwtPayload;
  credentials: string;
  user: Omit<User, 'password' | 'deletedAt'>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface SortParams {
  sort?: string;
  order?: string;
}
