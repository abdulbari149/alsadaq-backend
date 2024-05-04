import { type Handler, Router } from 'express';
import boycottProductsController from './boycott-products.controller';
import { AccessControlPolicy, Roles } from '@/enums/roles.enum';
import { verifyAuthToken } from '@/middlewares/auth';
import { checkRole } from '@/middlewares/check-role';
import RequestValidator from '@/middlewares/request-validator';
import {
  CreateBoycottProductBulkDto,
  CreateBoycottProductDto,
  ListBoycottProductsQueryDto,
} from '@/dto/boycott-products.dto';

const router = Router();

router.post(
  '/',
  verifyAuthToken,
  checkRole(AccessControlPolicy.ALLOW, [Roles.ADMIN]),
  RequestValidator.validate(CreateBoycottProductDto, 'body'),
  boycottProductsController.createBoycottProduct
);

router.post(
  '/bulk',
  verifyAuthToken,
  checkRole(AccessControlPolicy.ALLOW, [Roles.ADMIN]),
  RequestValidator.validate(CreateBoycottProductBulkDto, 'body'),
  boycottProductsController.createBoycottProductBulk
);

router.get(
  '/',
  RequestValidator.validate(ListBoycottProductsQueryDto, 'query'),
  boycottProductsController.listBoycottProducts as unknown as Handler
);

export default router;
