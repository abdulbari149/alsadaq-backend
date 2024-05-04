import { access, mkdir } from 'fs/promises';
import path, { resolve } from 'path';
import crypto from 'crypto';
import { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { HttpBadRequestError } from '@/lib/errors';
import {
  DirectoryPathForUploadTypes,
  FileMimesForUploadTypes,
} from '@/constants/file';

export const uploader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const type = req.params.type as keyof typeof DirectoryPathForUploadTypes;
    let maxFileCount = 1;
    if (req.query.count) {
      maxFileCount = parseInt(req.query.count as string, 10);
    }

    if (maxFileCount > 5) {
      throw new HttpBadRequestError('Invalid file count', [
        'You can only upload 5 files at a time',
      ]);
    }

    const dir = DirectoryPathForUploadTypes[type];

    const validMimeTypes = FileMimesForUploadTypes[type];

    if (!dir || !validMimeTypes) {
      throw new HttpBadRequestError('Invalid file type', [
        `File type ${type} is not supported`,
      ]);
    }

    const dirPath = resolve(__dirname, `../../public/uploads/${dir}`);
    try {
      await access(dirPath);
    } catch (error) {
      await mkdir(dirPath, { recursive: true });
    }

    res.locals.upload = {
      dir: {
        name: dir,
        path: dirPath,
      },
      file: {
        type,
        maxCount: maxFileCount,
      },
    };

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, dirPath);
      },
      filename: (req, file, cb) => {
        const fileName =
          crypto.randomBytes(16).toString('hex') +
          '-' +
          Date.now().toString(10) +
          path.extname(file.originalname);
        cb(null, fileName);
      },
    });

    const multerHandler = multer({
      storage,
      fileFilter: (req, file, cb) => {
        if (validMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new HttpBadRequestError('Invalid file type', [
              `File type ${file.mimetype} is not supported`,
            ])
          );
        }
      },
    }).array('file', maxFileCount);
    multerHandler(req, res, next);
  } catch (error) {
    next(error);
  }
};
