/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import express from 'express';
import { Passport, serializeUser, deserialize } from '../helper/passport configuration.js';
import FacebookStrategy from '../helper/FacebookStrategy.js';
import session from '../helper/passportSessionOfFb.js';
import USerServicies from '../database/services/userservicies.js';
import { sign } from '../helper/JWT.js';

const fb = express();
fb.use(session);

// Configure Passport.js
fb.use(Passport.initialize());
fb.use(Passport.session());

Passport.use(FacebookStrategy);
serializeUser;
deserialize;

// Facebook authentication
fb.get('/auth/facebook', Passport.authenticate('facebook'));

// Facebook authentication callback
fb.get('/auth/facebook/callback', Passport.authenticate('facebook', { failureRedirect: '/login' }), async (req, res) => {
  const {
    email, id, name, picture
  } = req.user;
  await USerServicies.signupWithGoogle(name, email, picture);
  const token = await sign({ email, id });
  res.json({ token });
});
