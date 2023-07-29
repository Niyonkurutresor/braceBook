/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { PostsController } from '../controller/postsController.js';
import { updateUserValidator } from '../middleware/validator/postValidator.js';
import { isLoggedIn } from '../middleware/authorization copy.js';

const routes = express();

routes.post('/all', isLoggedIn, PostsController.getPosts);
routes.delete('/:id', isLoggedIn, PostsController.deletePost);
routes.post('/:id/update', isLoggedIn, updateUserValidator, PostsController.updatePost);
routes.post('/createPost', isLoggedIn, PostsController.createPost);
routes.get('/:id', isLoggedIn, PostsController.getpost);
routes.post('/like/:id', isLoggedIn, PostsController.like);

export default routes;
