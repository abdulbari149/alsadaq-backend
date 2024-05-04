import { type NextFunction, type Request, type Response } from 'express';
import { HttpUnAuthorizedError } from '@/lib/errors';
import token from '@/lib/token';
import { TokenType } from '@/enums/types.enum';
import prisma from '@/lib/prisma';

export const verifyAuthToken = async (
  // Remove underscore of params once you start using them
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwtToken = req.headers.authorization;
    const unauthorizedError = new HttpUnAuthorizedError('Unauthorized');
    const tokenNotProvided = new HttpUnAuthorizedError('Token not provided');
    const invalidToken = new HttpUnAuthorizedError('Invalid token');

    if (!jwtToken) {
      throw tokenNotProvided;
    }

    const tokenParts = jwtToken.split(' ');

    if (tokenParts.length !== 2) {
      throw invalidToken;
    }

    const [scheme, credentials] = tokenParts;

    if (scheme !== 'Bearer') {
      throw invalidToken;
    }

    const payload = token.verifyToken<{
      id: string;
      email: string;
      role: string;
    }>(credentials, TokenType.ACCESS);

    if (!payload) {
      throw unauthorizedError;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    if (!user) {
      throw unauthorizedError;
    }

    res.locals.user = user;
    res.locals.token = credentials;
    res.locals.payload = payload;
    next();
  } catch (error) {
    next(error);
  }
};
