/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import AppError from '../helper/AppError.js';
import userServices from '../database/services/userservicies.js';

export function only(...user) {
  return async (req, res, next) => {
    const { id } = req.AuthoreizedUser;
    const userLore = await userServices.findUserById(id);
    if (!user.includes(userLore.role)) return next(new AppError(403, 'Fail', 'You are not allowed to perform this acction'));

    next();
  };
}
