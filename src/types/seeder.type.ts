import type { PrismaClient } from '@prisma/client';

export interface Seeder {
  isExecutable: boolean;
  seed: (prisma: PrismaClient) => Promise<void>;
}
