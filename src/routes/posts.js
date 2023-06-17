/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { PostsController } from '../controller/postsController.js';

const routes = express();

routes.post('/all', PostsController.getPosts);

export default routes;
