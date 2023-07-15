/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import UserController from '../controller/userController.js';
import { createUserValidator } from '../middleware/validator/createUser.js';
import { isEmailVerfied } from '../middleware/isEmailVerfied.js';
import { isLoggedIn } from '../middleware/authorization copy.js';
import { only } from '../middleware/auntentication.js';

const routes = express();

routes.post('/createUser', createUserValidator, UserController.createUser);
routes.get('/verfie/:id', UserController.emailVelification);
// route.get('/signupWithGoogle', UserController.signUpWithGoogle);
// route.get('/signupWithFacebook', UserController.signUpWithFacebook);
// route.get('/signupWithGithub', UserController.signUpWithGitHub);
routes.post('/userLogin', isEmailVerfied, UserController.userLOgIn);
routes.post('/forgetPassword', isEmailVerfied, UserController.forgotPassword);
routes.post('/resetPassword/:email/:resetToken', UserController.resetPassword);
routes.post('/updatePassword', isLoggedIn, UserController.updatePassword);
routes.post('/createUserProfileInfo', UserController.createUserProfileInfo);
routes.post('/updateUserProfileInfo', UserController.updateUserProfileInfo);
routes.post('/createProfilePicture', UserController.createProfilePicture);
routes.post('/updateProfilePicture', UserController.updateProfilePicture);

export default routes;
