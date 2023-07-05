/* eslint-disable import/extensions */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import cloudinary from 'cloudinary';
import config from './config.js';

cloudinary.v2.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});
export default cloudinary;
