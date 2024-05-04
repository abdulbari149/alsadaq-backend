import { HttpStatusCode } from 'axios';
import environment from '@/lib/environment';
import { HttpBadRequestError } from '@/lib/errors';
import catchAsync from '@/utils/catch-async';

const uploadFile = catchAsync<
  Array<{
    name: string;
    size: number;
    url: string;
  }>,
  any,
  any,
  any,
  any
>(async (req, res) => {
  const { files } = req;

  if (!files || !Array.isArray(files) || !files.length) {
    throw new HttpBadRequestError('No file uploaded', ['Please upload a file']);
  }

  const payload = res.locals.upload as {
    dir: {
      name: string;
      path: string;
    };
    file: {
      type: string;
      maxCount: number;
    };
  };

  const dir = `uploads/${payload.dir.name}`;

  let baseUrl = `${environment.appUrl}`;

  if (environment.isDev()) {
    baseUrl += `:${environment.port}`;
  }

  const data = files.map((file) => {
    return {
      name: file.filename,
      size: file.size,
      originalName: file.originalname,
      url: `${baseUrl}/${dir}/${file.filename}`,
    };
  });

  return {
    data,
    message: 'Files uploaded successfully',
    statusCode: HttpStatusCode.Created,
  };
});

export default {
  uploadFile,
};
