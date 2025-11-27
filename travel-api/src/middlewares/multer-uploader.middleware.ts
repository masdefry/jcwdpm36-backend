import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { AppError } from '../utils/app-error';

function multerUploader(
  destinationPath: string,
  acceptedFiles: string[],
  limitFileSize: number,
  storageType: string
) {
  const storage =
    storageType === 'disk'
      ? multer.diskStorage({
          destination: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            const currentDirectory = path.join(process.cwd());
            cb(null, `${currentDirectory}/${destinationPath}`);
          },
          filename: function (
            req: Request,
            file: Express.Multer.File,
            cb: (error: Error | null, destination: string) => void
          ) {
            const originalNameLength = file?.originalname?.split('.').length; // []
            const extensionFile =
              file?.originalname?.split('.')[originalNameLength - 1];
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + `.${extensionFile}`);
          },
        })
      : multer.memoryStorage();

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    const originalNameLength = file?.originalname?.split('.').length; // []
    const extensionFile =
      file?.originalname?.split('.')[originalNameLength - 1];

    console.log(file);
    if (acceptedFiles.includes(extensionFile)) {
      return cb(null, true);
    } else {
      return cb(AppError(`${extensionFile} is not accepted`, 400));
    }
  }

  return multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: limitFileSize },
  });
}

export default multerUploader;
