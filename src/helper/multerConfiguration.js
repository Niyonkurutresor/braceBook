/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.resolve('./uploads');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const temp_name = file.originalname.split('.');
    const fpart = temp_name[0];
    const extension = temp_name[1];
    const name = `${fpart + Date.now()}.${extension}`;

    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter(req, file, cb) {
    const filetypes = /jpeg|jpg|png|MOV|WMV|AVI|mp4/;
    const extname = filetypes.test(path.extname(
      file.originalname
    ).toLowerCase());

    if (extname) {
      return cb(null, true);
    }

    cb(`Error: File upload only supports the following filetypes: ${filetypes}`);
  }
}).single('content');

export default upload;
