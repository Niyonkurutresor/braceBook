/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import UserController from '../controller/userController.js';
import { createUserValidator } from '../middleware/validator/createUser.js';

const routes = express();

routes.post('/createUser', createUserValidator, UserController.createUser);
routes.get('/verfie/:id', UserController.emailVelification);
export default routes;
