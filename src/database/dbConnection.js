/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';
import config from '../helper/config.js';

const databaseconnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.DATABASEULR);
    console.log('database is connected .....');
  } catch (error) {
    console.log('something went wrong. database is not connected', error);
  }
};

export default databaseconnection;
