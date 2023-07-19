/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import express from 'express';
import USerServicies from '../database/services/userservicies.js';
import { sign } from '../helper/JWT.js';
import { googleStrategy } from '../helper/GoogleStratey.js';
import session from '../helper/passportSessionOfFb.js';
import { Passport, serializeUser, deserialize } from '../helper/passport configuration.js';
import AppError from '../helper/AppError.js';

const routes = express();
routes.use(session);

// Configure Passport.js
routes.use(Passport.initialize());
routes.use(Passport.session());

// Set up the Google OAuth 2.0 strategy
Passport.use(googleStrategy);

// Serialize and deserialize user data
serializeUser;
deserialize;

// select and login into your google account to be authenticated
routes.get('/auth/google', Passport.authenticate('google', { scope: ['profile', 'email'] }));

// once user is authenticated will be redirected to call back url
routes.get('/api/v1/signupWithGoogle', Passport.authenticate('google', { failureRedirect: '/login' }), async (req, res, next) => {
  try {
    const {
      email, id, name, picture
    } = req.user;
    const user = await USerServicies.signupWithGoogle(name, email, picture);
    if (!user) return next(new AppError(400, 'Fail', 'User is not created.something went wrong'));
    const token = await sign({ email, id });
    // Respond with the generated token
    res.json({ token });
  } catch (error) {
    next(new AppError(500, 'Fail', error));
  }
});

routes.get('/login', (req, res, next) => {
  next(new AppError(400, 'Fail', 'You failed to log in'));
});

export default routes;
