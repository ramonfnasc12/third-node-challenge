import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempfolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempfolder,
  storage: multer.diskStorage({
    destination: tempfolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(5).toString('HEX');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
