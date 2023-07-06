/* eslint-disable no-return-await */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from './config.js';

const secret = config.SECRET;

const sign = async (payload) => await promisify(jwt.sign)(payload, secret, { expiresIn: config.TOKENEXPIRATION });
const verify = async (payload) => await promisify(jwt.verify)(payload, secret);

export { sign, verify };
