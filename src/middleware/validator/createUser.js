/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import joiValidator from '../../helper/joiValidator.js';
import { createUserSchema } from './model/user/signiupValidation.js';

export const createUserValidator = (req, res, next) => {
  joiValidator(createUserSchema, req.body, next);
};
