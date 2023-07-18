/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import FacebookStrategy from 'passport-facebook';
import config from './config.js';

const fbStrategy = new FacebookStrategy(
  {
    clientID: config.fclientID,
    clientSecret: config.fclientSecret,
    callbackURL: config.fcallbackURL,
    profileFields: ['id', 'displayName', 'email'],
  },
  (accessToken, refreshToken, profile, done) => {
    const user = {
      wholeData: profile,
      id: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
    };
    done(null, user);
  }
);

export default fbStrategy;
