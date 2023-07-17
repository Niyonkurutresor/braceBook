/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import str from 'passport-google-oauth20';
import config from './config.js';

export const googleStrategy = new str.Strategy(
  {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      wholeData: profile,
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value,
      language: profile.locale
    };
    done(null, user);
  }
);
