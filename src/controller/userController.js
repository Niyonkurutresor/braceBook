/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import AppError from '../helper/AppError.js';
import { generate, check } from '../helper/bcrypt.js';
import response from '../helper/response.js';
import randomString from '../helper/crypto.js';
import mailering from '../helper/nodeMailer.js';
import userServicies from '../database/services/userservicies.js';
import { sign } from '../helper/JWT.js';

class UserController {
  static async createUser(req, res, next) {
    try {
      let { userName, email, password } = req.body;
      if (!userName || !email || !password) return next(new AppError(400, 'Bad reques', 'usermane, email and password are required'));
      password = await generate(password);
      const emailVerficationToken = await randomString();
      // generating URL
      const emailVerficationURL = `${req.protocol}://${req.get('host')}/api/v1/user/verfie/${emailVerficationToken}`;
      // sending mail
      const mailSent = await mailering({ userName, email, emailVerficationURL }, 'createAccount');
      if (!mailSent) return next(new AppError(400, 'Fail', 'Email failt to be sent to the user'));
      // create a user
      const user = await userServicies.createUsers({
        userName, email, password, emailVerficationToken
      });
      response(res, 201, `${user.userName} Verfy your email to complete signup process!`, user);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async emailVelification(req, res, next) {
    try {
      const Token = req.params.id;
      const user = await userServicies.emailVerfication(Token);
      if (!user) return next(new AppError(403, 'Forbiden', 'There is no tooken to verfie'));
      await userServicies.updateEmailverfication(Token);
      // token generation
      const { email, _id } = user;
      const token = await sign({ email, _id });
      response(res, 200, `Thank you ${user.userName}. Velification is done successfuly! and your tooken Token${token}Token`);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }
}

export default UserController;
