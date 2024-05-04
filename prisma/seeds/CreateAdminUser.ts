// eslint-disable-next-line unicorn/filename-case
import { type PrismaClient } from '@prisma/client';
import { type Seeder } from '../../src/types/seeder.type';
import { Roles } from '../../src/enums/roles.enum';
import crypt from '../../src/lib/crypt';
import userService from '../../src/modules/users/users.service';

const admins = [
  {
    email: 'abdulbari131103@gmail.com',
    name: 'Abdul bari',
    password: 'abcd1234',
    role: Roles.ADMIN,
  },
  {
    email: 'codewithharsh16@gmail.com',
    name: 'Code with harsh',
    password: 'abcd1234',
    role: Roles.ADMIN,
  },
];

class CreateAdminUsers implements Seeder {
  isExecutable: boolean = true;

  async seed(prisma: PrismaClient): Promise<void> {
    const adminsData = await Promise.all(
      admins.map(async (admin) => {
        return {
          ...admin,
          password: await crypt.hash(admin.password),
        };
      })
    );

    try {
      await Promise.all(
        adminsData.map(async (admin) => {
          return await userService.createUser(admin);
        })
      );
      console.log(`Admins Created succesfully!`);
    } catch (e) {
      console.error(e);
    }
  }
}
export default CreateAdminUsers;
