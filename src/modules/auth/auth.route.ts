import { Router } from 'express';
import authController from './auth.controller';
import RequestValidator from '@/middlewares/request-validator';
import { LoginDto } from '@/dto/auth.dto';

const router = Router();

// router.post(
//   '/signup',
//   RequestValidator.validate(SignupDto, 'body'),
//   authController.signup
// );

router.post(
  '/login',
  RequestValidator.validate(LoginDto, 'body'),
  authController.login
);

export default router;
