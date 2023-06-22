/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import Joi from 'joi';
import AppError from '../../../../helper/AppError.js';

export const updatePostSchema = Joi.object({
  postContent: Joi.string().trim().required().error(new AppError(400, 'Fail', 'Please provide content ro replace old one'))
});
