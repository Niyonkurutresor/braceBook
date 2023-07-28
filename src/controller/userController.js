/* eslint-disable no-sequences */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-bitwise */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import fs from 'fs';
import AppError from '../helper/AppError.js';
import { generate, check } from '../helper/bcrypt.js';
import response from '../helper/response.js';
import randomString from '../helper/crypto.js';
import mailering from '../helper/nodeMailer.js';
import userServicies from '../database/services/userservicies.js';
import { sign } from '../helper/JWT.js';
import config from '../helper/config.js';
import cloudinary from '../helper/claudinaryConfiguration.js';
import upload from '../helper/multerConfiguration.js';
import { deleteEmetyObj } from '../helper/filterEmptyObjelement.js';

class UserController {
  static async createUser(req, res, next) {
    try {
      let { userName, email, password } = req.body;
      if (!userName || !email || !password) return next(new AppError(400, 'Bad reques', 'usermane, email and password are required'));
      password = await generate(password);
      const emailVerficationToken = await randomString();
      // generating URL
      const emailVerficationURL = `${req.protocol}://${req.get('host')}/api/v1/user/verfie/${emailVerficationToken}`;
      // create a user
      email = email.toLowerCase();
      const user = await userServicies.createUsers({
        userName, email, password, emailVerficationToken
      });
      if (!user) return next(new AppError(400, 'Fail', 'Account doesn\'t created. Try again'));
      // sending mail
      const mailSent = await mailering({ userName, email, emailVerficationURL }, 'createAccount');
      if (!mailSent) return next(new AppError(400, 'Fail', 'Email failt to be sent to the user'));
      response(res, 201, `${user.userName} Verfy your email to complete signup process!`, user);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async emailVelification(req, res, next) {
    try {
      const Token = req.params.id;
      const user = await userServicies.emailVerfication(Token);
      if (!user) return next(new AppError(403, 'Forbiden', 'Your email is verfied. There is no tooken to verfi'));
      await userServicies.updateEmailverfication(Token);
      // token generation
      const { email } = user;
      const id = user._id;
      const token = await sign({ email, id });
      response(res, 200, `Thank you ${user.userName}. Velification is done successfuly! and your tooken Token${token}Token`);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async userLOgIn(req, res, next) {
    try {
      let { email, password } = req.body;
      email = email.toLowerCase();
      if (!email || !password) return next(new AppError(400, 'Fail', 'Plsease, provide both email and password'));
      const isUser = await userServicies.findEmail(email);
      if (!isUser || !await check(password, isUser.password)) return next(new AppError(401, 'Unauthorized', 'Invalid user name or password'));
      const id = isUser._id;
      const token = await sign({ email, id });
      return response(res, 200, `Well come ${isUser.userName}. \nYou login successfuly! Token${token}Token`);
    } catch (error) {
      next(new AppError(500, 'ERROR', error));
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) return next(new AppError(401, 'Fail', 'Please provide your email'));
      const user = await userServicies.forgetPassword(email);
      if (!user) return next(new AppError(404, 'Bad request', 'There is no such user. please provide email used to signup'));

      const password = await randomString();
      const passwordResetToken = await generate(password);
      const passwordChangedAt = Date.now();
      const passwordResetExpired = Date.now() + parseInt(config.RESETTOKENEXPIRATION);
      await userServicies.forgetPassword(email, passwordChangedAt, passwordResetToken, passwordResetExpired);
      const passwordResetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${email}/${password}`;
      // Send Email To user
      const { userName } = user;
      const mailSent = await mailering({ userName, passwordResetURL, email }, 'forgotPassword');
      if (!mailSent) return next(new AppError(400, 'Fail', 'Email failt to be sent to the user'));
      response(res, 200, `Visit your email to reset password. This token will be expired in ${passwordResetExpired / 1000} seconds. ${passwordResetURL}`);
    } catch (error) {
      next(new AppError(500, 'ERROR', error));
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { email, resetToken } = req.params;
      let { password } = req.body;
      if (!password) return next(new AppError(400, 'Fail', 'provide password'));
      const user = await userServicies.findUser(email);
      if (!user) return next(new AppError(404, 'Fail', 'User not found.'));
      if (user.passwordResetToken === null) return next(new AppError(401, 'Fail', 'Your password is reseted successfuly, are you trying to reset again?'));
      const validtToken = await check(resetToken, user.passwordResetToken);
      if (!validtToken) return next(new AppError(201, 'Fail', 'your reset token is invalid, pleas try again'));
      if (user.passwordResetExpired & ((user.passwordResetExpired).getTime()) < Date.now()) {
        return next(new AppError(401, 'Fail', 'Oops! Your reset token is expired, please try again'));
      }
      const id = user._id;
      password = await generate(password);
      await userServicies.resetPassword(id, password, Date.now());
      const token = await sign({ email, id });
      response(res, 200, `Password updeted successfuly.Token${token}Token`);
    } catch (error) {
      next(new AppError(500, 'ERROR', error));
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const { password, newPassword, confirmNewPassword } = req.body;
      if (!password || !newPassword || !confirmNewPassword) return next(new AppError(403, 'fail', 'You must fill all fields and correctly'));
      const user = await userServicies.findEmail(req.user.email);
      if (!user) return next(new AppError(404, 'Fail', 'Oops! User not found!'));
      const correctPassword = await check(password, user.password);
      if (!correctPassword) return next(new AppError(403, 'Fail', 'You insert incorct password, please try again.'));
      const hashedPassword = await generate(newPassword);
      const passwordChangedAt = Date.now();
      await userServicies.updatePassword(user._id, hashedPassword, passwordChangedAt);
      const id = user._id;
      const { email } = user;
      const token = await sign({ email, id });
      response(res, 200, `Hello again ${user.userName}. You manage to update password. Token${token}Token`);
    } catch (error) {
      next(new AppError(500, 'ERROR', error));
    }
  }

  static async createUserProfileInfo(req, res, next) {
    try {
      const { email } = req.user;
      const {
        firstName, lastName, birthDate, gender
      } = req.body;
      if (!firstName || !lastName || !birthDate || !gender) return next(new AppError(404, 'Fail', 'All fields are required to be filled.'));
      const userInfo = await userServicies.createUserProfileInfo(email, firstName, lastName, birthDate, gender);
      response(res, 201, userInfo);
    } catch (error) {
      next(new AppError(500, 'Fail', error));
    }
  }

  static async updateUserProfileInfo(req, res, next) {
    try {
      const userinfo = req.body;
      const filterdInfo = deleteEmetyObj(userinfo);
      const { email } = req.user;
      const userInfo = await userServicies.updateUserProfile(email, filterdInfo);
      const user = await userServicies.findUserById(userInfo._id);
      response(res, 201, user);
    } catch (error) {
      next(new AppError(500, 'Fail', error));
    }
  }

  static async createProfilePicture(req, res, next) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          next(new AppError(400, 'Fail', err));
        }
        try {
          // email should come from req.user as there will be logged in user.
          const { email } = req.body;
          const user = await userServicies.findUser(email);
          if (user.profilePicture.URL) return next(new AppError(400, 'Fail', 'Please you need to update profile picture'));
          if (req.file) {
            try {
              const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image' });
              const URL = result.secure_url;
              const publicId = result.public_id;
              const info = { URL, publicId };
              const information = deleteEmetyObj(info);
              const updated = await userServicies.createUserProfilePicture(email, information);
              if (!updated) next(new AppError(404, 'Fail', 'something went wrong with your email. Please try again'));
              response(res, 201, 'Profile picture created successfully!', URL);
              fs.unlinkSync(req.file.path);
            } catch (error) {
              throw error;
            }
          }
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      next(new AppError(500, 'Fail', error));
    }
  }

  static async updateProfilePicture(req, res, next) {
    upload(req, res, async (err) => {
      if (err) {
        next(new AppError(400, 'Fail', err));
      }
      try {
        // email should come from req.user as there will be logged in user.
        const { email } = req.body;
        const user = await userServicies.findUser(email);
        const { publicId } = user.profilePicture;
        if (!publicId) return next(new AppError(404, 'Not found', 'There is no profile to update'));
        if (req.file) {
          try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image', public_id: publicId });
            const URL = result.secure_url;
            const info = { URL, publicId };
            const information = deleteEmetyObj(info);
            await userServicies.createUserProfilePicture(email, information);
            response(res, 201, 'Post is updated successfuly!', result.secure_url);
            fs.unlinkSync(req.file.path);
          } catch (error) {
            fs.unlinkSync(req.file.path);
            throw error;
          }
        }
      } catch (error) {
        next(new AppError(500, 'Fail', error));
      }
    });
  }

  static async createCoverPhoto(req, res, next) {
    try {
      upload(req, res, async (err) => {
        if (err) {
          next(new AppError(400, 'Fail', err));
        }
        try {
          // email should come from req.user as there will be logged in user.
          const { email } = req.body;
          const user = await userServicies.findUser(email);
          if (user.coverPhoto.URL) return next(new AppError(400, 'Fail', 'Please you need to update profile picture'));
          if (req.file) {
            try {
              const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image' });
              const URL = result.secure_url;
              const publicId = result.public_id;
              const info = { URL, publicId };
              const information = deleteEmetyObj(info);
              const updated = await userServicies.coverphoto(email, information);
              if (!updated) next(new AppError(404, 'Fail', 'something went wrong with your email. Please try again'));
              response(res, 201, 'Profile picture created successfully!', URL);
              fs.unlinkSync(req.file.path);
            } catch (error) {
              throw error;
            }
          }
        } catch (error) {
          throw error;
        }
      });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      next(new AppError(500, 'Fail', error));
    }
  }

  static async updateCoverPhoto(req, res, next) {
    upload(req, res, async (err) => {
      if (err) {
        next(new AppError(400, 'Fail', err));
      }
      try {
        // email should come from req.user as there will be logged in user.
        const { email } = req.body;
        const user = await userServicies.findUser(email);
        const { publicId } = user.coverPhoto;
        if (!publicId) return next(new AppError(404, 'Not found', 'There is no profile to update'));
        if (req.file) {
          try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image', public_id: publicId });
            const URL = result.secure_url;
            const info = { URL, publicId };
            const information = deleteEmetyObj(info);
            await userServicies.coverphoto(email, information);
            response(res, 201, 'Post is updated successfuly!', result.secure_url);
            fs.unlinkSync(req.file.path);
          } catch (error) {
            fs.unlinkSync(req.file.path);
            throw error;
          }
        }
      } catch (error) {
        next(new AppError(500, 'Fail', error));
      }
    });
  }
}

export default UserController;
