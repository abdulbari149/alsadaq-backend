import { HttpStatusCode } from 'axios';
import { type BoycottProduct } from '@prisma/client';
import boycottProductsService from './boycott-products.service';
import {
  type ListBoycottProductsQueryDto,
  type CreateBoycottProductDto,
  type CreateBoycottProductBulkDto,
} from '@/dto/boycott-products.dto';
import catchAsync from '@/utils/catch-async';

const createBoycottProduct = catchAsync<any, CreateBoycottProductDto>(
  async (req) => {
    const data = await boycottProductsService.createBoycottProduct(req.body);
    return {
      data,
      statusCode: HttpStatusCode.Created,
      message: 'Boycott Product Info Created!',
    };
  }
);

const createBoycottProductBulk = catchAsync<any, CreateBoycottProductBulkDto>(
  async (req) => {
    const data = await Promise.all(
      req.body.products.map(
        async (product) =>
          await boycottProductsService.createBoycottProduct(product)
      )
    );
    return {
      data,
      statusCode: HttpStatusCode.Created,
      message: 'Boycott Product Bulk Created!',
    };
  }
);

const listBoycottProducts = catchAsync<
  BoycottProduct[],
  any,
  any,
  ListBoycottProductsQueryDto
>(async (req) => {
  const products = await boycottProductsService.listBoycottProducts(req.query);
  return {
    data: products,
    statusCode: HttpStatusCode.Ok,
  };
});

export default {
  createBoycottProduct,
  createBoycottProductBulk,
  listBoycottProducts,
};
