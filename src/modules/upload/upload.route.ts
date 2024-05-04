import { Router } from 'express';
import { IsEnum, IsNotEmpty } from 'class-validator';
import uploadController from './upload.controller';
import { uploader } from '@/middlewares/uploader';
import RequestValidator from '@/middlewares/request-validator';
import { UploadTypes } from '@/enums/types.enum';

class UploaderParamDto {
  @IsNotEmpty()
  @IsEnum(UploadTypes)
  type: string;
}

const router = Router();

router.post(
  '/:type',
  RequestValidator.validate(UploaderParamDto, 'params'),
  uploader,
  uploadController.uploadFile
);

export default router;
