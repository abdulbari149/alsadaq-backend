import { PrismaClient } from '@prisma/client';
import logger from '../src/lib/logger';
import seeds from './seeds';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  const promises = seeds.map(async (Seed) => {
    const instance = new Seed();
    if (!instance.isExecutable) {
      return;
    }
    await instance.seed(prisma);
  });
  await Promise.all(promises);
}

async function main(): Promise<void> {
  let isError: boolean = false;
  try {
    await seed();
  } catch (e) {
    isError = true;
    logger.error(e);
  } finally {
    await prisma.$disconnect();
    process.exit(isError ? 1 : 0);
  }
}

void main();
