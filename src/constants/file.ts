import { UploadTypes } from '@/enums/types.enum';

const images = ['image/jpeg', 'image/png', 'image/gif'];
// const videos = ['video/mp4', 'video/quicktime'];
// const documents = [
//   'application/pdf',
//   'application/msword',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// ];

export const FileMimesForUploadTypes = {
  [UploadTypes.PRODUCT]: images,
};

export const DirectoryPathForUploadTypes = {
  [UploadTypes.PRODUCT]: 'products/',
};
