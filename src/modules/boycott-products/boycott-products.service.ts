import { type Prisma } from '@prisma/client';
import {
  type ListBoycottProductsQueryDto,
  type CreateBoycottProductDto,
} from '@/dto/boycott-products.dto';
import { HttpInternalServerError } from '@/lib/errors';
import prisma from '@/lib/prisma';

const createBoycottProduct = async (data: CreateBoycottProductDto) => {
  try {
    return await prisma.boycottProduct.create({
      data,
    });
  } catch (error) {
    throw new HttpInternalServerError('Cannot create boycott product!');
  }
};

const listBoycottProducts = async (query: ListBoycottProductsQueryDto) => {
  try {
    const options: Prisma.BoycottProductFindManyArgs = {
      where: {},
    };
    if (query.category) {
      options.where = {
        ...options.where,
        category: query.category,
      };
    }
    const products = await prisma.boycottProduct.findMany(options);

    return products;
  } catch (error) {
    throw new HttpInternalServerError('List boycott products failed');
  }
};

export default {
  createBoycottProduct,
  listBoycottProducts,
};
