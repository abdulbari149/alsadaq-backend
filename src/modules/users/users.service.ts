import { type Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import LogMessage from '@/decorators/log-message.decorator';

class UserService {
  @LogMessage<[Prisma.UserCreateInput]>({ message: 'test-decorator' })
  public async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }
}

const userService = new UserService();

export default userService;
