/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import user from './user.js';
import post from './posts.js';
import comments from './comment.js';
import stories from './storie.js';
import imageVideosPost from './imageVideoPost.js';
import friendship from './friendship.js';
import errorController from '../controller/errorController.js';
import AppError from '../helper/AppError.js';

const routes = express();

routes.use('/user', user);
routes.use('/post', post);
routes.use('/comment', comments);
routes.use('/stories', stories);
routes.use('/imageVideosPost', imageVideosPost);
routes.use('/friend', friendship);
routes.all('*', (req, res, next) => {
  next(new AppError(404, 'Fail', ` Sorry we can't ${req.method} Information on  ${req.originalUrl}`));
});
routes.use(errorController);

export default routes;
