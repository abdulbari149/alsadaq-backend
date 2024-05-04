import { sign, verify } from 'jsonwebtoken';
import environment from './environment';
import { type TokenType } from '@/enums/types.enum';

const signToken = <TPayload extends object>(
  payload: TPayload,
  type: TokenType
) => {
  const secret = environment.jwt[type].secret;
  const expiration = environment.jwt[type].expiration;
  return sign(payload, secret, { expiresIn: expiration });
};

const verifyToken = <TPayload extends object>(
  token: string,
  type: TokenType
) => {
  const secret = environment.jwt[type].secret;
  return verify(token, secret) as TPayload;
};

export default {
  signToken,
  verifyToken,
};
