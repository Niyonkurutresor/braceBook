/* eslint-disable consistent-return */
export default (schema, userData, res, next) => {
  const { error } = schema.validateAsync(userData);
  if (error) return next(error);
  next();
};
