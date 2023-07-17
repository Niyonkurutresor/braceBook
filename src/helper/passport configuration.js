import passport from 'passport';

export const serializeUser = passport.serializeUser((user, done) => {
  done(null, user);
});

export const deserialize = passport.deserializeUser((user, done) => {
  done(null, user);
});

export const Passport = passport;
