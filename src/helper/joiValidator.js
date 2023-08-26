/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import AppError from './AppError.js';

// export default async (schema, userData, next) => {
//   try {
//     await schema.validateAsync(userData);
//     next();
//   } catch (error) {
//     next(new AppError(400, 'Bad Request', error));
//   }
// };

export default (schema, userData, next) => {
  const { error } = schema.validate(userData);
  if (error) {
    return next(new AppError(400, 'validationError', error));
  }
  next();
};
