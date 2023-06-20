/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */

import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  max: 100,
  windowMs: 30 * 60 * 60 * 100, // 30 min
  message: 'Too man requests, you must request atleast 100 req in 30 min',
});

export default limiter;
