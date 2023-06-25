/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { PostsController } from '../controller/postsController.js';
import { updateUserValidator } from '../middleware/validator/postValidator.js';

const routes = express();

routes.post('/all', PostsController.getPosts);
<<<<<<< Updated upstream
routes.post('/:id/update', updateUserValidator, PostsController.updatePost);
=======
routes.delete('/:id', PostsController.deletePost);
routes.post('/:id/update', updateUserValidator, PostsController.updatePost);

>>>>>>> Stashed changes

export default routes;
