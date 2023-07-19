/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import { verify } from '../helper/JWT.js';
import AppError from '../helper/AppError.js';
import userServicies from '../database/services/userservicies.js';

export const isLoggedIn = async (req, res, next) => {
  let token;
  const headerAutho = req.headers.authorization;
  if (headerAutho && headerAutho.startsWith('Bearer')) {
    token = headerAutho.split(' ')[1];
  }
  if (!token) return next(new AppError(401, 'Fail', 'You are not logged in, Please login first.'));
  // decode token
  let decoded;
  try {
    decoded = await verify(token);
  } catch (error) {
    return next(new AppError(401, 'Fail', error));
  }
  // find if decoded user in our database
  const isUserExiste = await userServicies.findUserById(decoded.id);
  if (!isUserExiste) return next(new AppError(401, 'Fail', 'User no longer existe'));
  // if user update password after token has been issued.
  const tokenIssuedAt = (decoded.iat);
  if (isUserExiste.passwordChangedAt && tokenIssuedAt < parseInt((isUserExiste.passwordChangedAt.getTime()) / 1000)) return next(new AppError(403, 'Fail', 'User has change the password please log in again.}'));
  req.user = decoded;
  next();
};
