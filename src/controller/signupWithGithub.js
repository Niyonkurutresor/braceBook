/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import express from 'express';
import { Passport, serializeUser, deserialize } from '../helper/passport configuration.js';
import FacebookStrategy from '../helper/FacebookStrategy.js';
import session from '../helper/passportSessionOfFb.js';
import USerServicies from '../database/services/userservicies.js';
import { sign } from '../helper/JWT.js';
import AppError from '../helper/AppError.js';

const gh = express();
gh.use(session);

// Configure Passport.js
gh.use(Passport.initialize());
gh.use(Passport.session());

Passport.use(FacebookStrategy);
serializeUser;
deserialize;

// Facebook authentication
// to use This, will require further setting into facebook dev tool to help
// like ther reason you need to access the profile picture and so user name and so on.
gh.get(
  '/auth/github',
  Passport.authenticate('github', { scope: ['user:email'] })
);

gh.get('/login', async (req, res) => {
  res.status(400).json('Try to log in again');
});

// Facebook authentication callback by default the face book redirection Url is http://localhost
gh.get(
  '/auth/github/callback',
  Passport.authenticate('github', { failureRedirect: '/login' }),

  async (req, res, next) => {
    try {
      const {
        email, id, name, picture
      } = req.user;
      const usercreated = await USerServicies.signupWithFacebook(name, email, picture);
      if (!usercreated) return next(new AppError(404, 'Badd request', ''));
      const token = await sign({ email, id });
      res.json({ token });
    } catch (error) {
      next(new AppError(500, 'Fail', 'fail to repeat'));
    }
  }
);

export default gh;
