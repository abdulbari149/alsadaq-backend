import userService from '../users/users.service';
import { Roles } from '@/enums/roles.enum';
import { type LoginDto, type SignupDto } from '@/dto/auth.dto';
import crypt from '@/lib/crypt';
import {
  HttpConflictError,
  HttpNotFoundError,
  HttpUnAuthorizedError,
} from '@/lib/errors';
import prisma from '@/lib/prisma';

class AuthSerivce {
  public async register(body: SignupDto) {
    const [existingUser, password] = await Promise.all([
      prisma.user.findFirst({
        where: { email: body.email },
      }),
      crypt.hash(body.password),
    ]);

    if (existingUser) {
      throw new HttpConflictError('Phone number already exists');
    }

    const user = await userService.createUser({
      ...body,
      role: Roles.USER,
      password,
    });

    return user;
  }

  public async login(body: LoginDto) {
    const { email, password } = body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      throw new HttpNotFoundError('User not found!');
    }

    const isPasswordSame = await crypt.isMatch(password, user.password);

    if (!isPasswordSame) {
      throw new HttpUnAuthorizedError('Invalid password');
    }

    return {
      ...user,
      password: undefined,
    };
  }
}

const authService = new AuthSerivce();

export default authService;
