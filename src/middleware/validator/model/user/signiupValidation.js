/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import Joi from 'joi';
import AppError from '../../../../helper/AppError.js';

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
const gender = /^(male|female|private)$/;
const role = /^(user|admin|groupAdmin)$/;

export const createUserSchema = Joi.object({
  userName: Joi.string().trim().lowercase().required()
    .error(new AppError(400, 'Fail', 'Provide username.')),
  email: Joi.string().email().lowercase().required()
    .error(new AppError(400, 'Fail', 'Provide correct Email.')),
  password: Joi.string().regex(passwordRegex).required().error(new AppError(400, 'Fail', 'Password must contain at leaste 8characer: One capital letter, number and special character')),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).error(new AppError(400, 'Fail', 'Passwords do not match')),
  firstname: Joi.string().trim().uppercase().error(new AppError(400, 'Fail', 'Firs must be character')),
  lastName: Joi.string().trim().lowercase().error(new AppError(400, 'Fail', 'Last must be character')),
  emailIsVelfied: Joi.boolean().error(new AppError(400, 'Fail', 'Email verfication allow boolean type')),
  birthDate: Joi.date().error(new AppError(400, 'Fail', 'Provide birhd date')),
  location: {
    latitude: Joi.number().min(-90).max(90).error(new AppError(400, 'Fail', 'Latitued must be number.')),
    longitude: Joi.number().min(-180).max(180).error(new AppError(400, 'Fail', 'Longitude must be number.')),
  },
  profilepicture: Joi.string().trim().error(new AppError(400, 'Fail', 'Incorect profile URL')),
  coverPhoto: Joi.string().trim().error(new AppError(400, 'Fail', 'Incorect cover photo URL')),
  gender: Joi.string().trim().lowercase().regex(gender)
    .error(new AppError(400, 'Fail', 'Gender should be: Male, Female, or Privat.')),
  role: Joi.string().trim().lowercase().regex(role)
    .error(new AppError(400, 'Fail', 'Role should be : user, admin, groupAdmin')),
  active: Joi.boolean().error(new AppError(400, 'Fail', 'Status of account is not specified')),
});

export default createUserSchema;
