/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import UserController from '../controller/userController.js';
import { createUserValidator } from '../middleware/validator/createUser.js';

const routes = express();

routes.post('/createUser', createUserValidator, UserController.createUser);
routes.get('/verfie/:id', UserController.emailVelification);
// route.get('/signupWithGoogle', UserController.signUpWithGoogle);
// route.get('/signupWithFacebook', UserController.signUpWithFacebook);
// route.get('/signupWithGithub', UserController.signUpWithGitHub);
routes.post('/userLogin', UserController.userLOgIn);
routes.post('/forgetPassword', UserController.forgotPassword);
routes.post('/resetPassword/:email/:resetToken', UserController.resetPassword);
routes.post('/updatePassword', UserController.updatePassword);
routes.post('/userProfile', UserController.createUserProfileInfo);
export default routes;
