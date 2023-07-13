/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import userServicies from '../database/services/userservicies.js';
import AppError from '../helper/AppError.js';

export const isEmailVerfied = async (req, res, next) => {
  try {
    // Find user by email
    const { email } = req.body;
    const user = await userServicies.findEmail(email);
    if (user.emailIsVelfied === false) return next(new AppError(400, 'Fail', 'Please verfie your email'));
    next();
  } catch (error) {
    return next(new AppError(401, 'Fail', error));
  }
};
