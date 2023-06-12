/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import databaseconnection from './src/database/dbConnection.js';

const app = express();
databaseconnection();
export default app;
