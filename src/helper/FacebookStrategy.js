/* eslint-disable import/no-extraneous-dependencies */
import FacebookStrategy from 'passport-facebook';

const fbStrategy = new FacebookStrategy(
  {
    clientID: 'your-app-id', // Replace with your Facebook App ID
    clientSecret: 'your-app-secret', // Replace with your Facebook App Secret
    callbackURL: '/auth/facebook/callback', // Replace with your callback URL
    profileFields: ['id', 'displayName', 'email'], // Specify the user profile fields you need
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
