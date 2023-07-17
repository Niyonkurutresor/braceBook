/* eslint-disable import/no-extraneous-dependencies */
import session from 'express-session';

const passportSession = session({
  secret: 'your-session-secret', // Replace with your session secret
  resave: false,
  saveUninitialized: false,
});

export default passportSession;
