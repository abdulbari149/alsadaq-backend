import { HttpStatusCode } from 'axios';
import { type User } from '@prisma/client';
import authService from './auth.service';
import catchAsync from '@/utils/catch-async';
import { type SignupDto } from '@/dto/auth.dto';
import token from '@/lib/token';
import { TokenType } from '@/enums/types.enum';
import { type JwtPayload } from '@/types/common.type';

const signup = catchAsync<Omit<User, 'password'>, SignupDto>(async (req) => {
  const user = await authService.register(req.body);
  return {
    data: {
      ...user,
      password: undefined,
    },
    message: `User registered successfully`,
    success: true,
    statusCode: HttpStatusCode.Created,
  };
});

const login = catchAsync<any, SignupDto>(async (req) => {
  const { email, password } = req.body;

  const user = await authService.login({ email, password });

  // generate tokens
  const payload: JwtPayload = {
    id: user.id,
    role: user.role,
    email: user?.email ?? '',
  };

  const access = token.signToken(payload, TokenType.ACCESS);
  const refresh = token.signToken(payload, TokenType.REFRESH);

  return {
    data: {
      user,
      tokens: {
        access,
        refresh,
      },
    },
    message: 'User logged in',
    success: true,
    statusCode: HttpStatusCode.Ok,
  };
});

export default { signup, login };
