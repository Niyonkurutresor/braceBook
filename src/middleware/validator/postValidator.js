/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import joiValidator from '../../helper/joiValidator.js';
import { updatePostSchema } from './model/post/updatePost.js';

export const updateUserValidator = (req, res, next) => {
  joiValidator(updatePostSchema, req.body, next);
};
