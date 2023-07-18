/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import GitHubStrategy from 'passport-github';
import config from './config.js';

const ghStrategy = new GitHubStrategy(
  {
    clientID: config.gclientID,
    clientSecret: config.gclientSecret,
    callbackURL: config.gcallbackURL
  },
  // ((accessToken, refreshToken, profile, cb) => {
  //   User.findOrCreate({ githubId: profile.id }, (err, user) => cb(err, user));
  // })
);

export default ghStrategy;
