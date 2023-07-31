/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import CommentController from '../controller/commentController.js';
import { isLoggedIn } from '../middleware/authorization copy.js';

const routes = express();
routes.post('/text/:id', isLoggedIn, CommentController.createTextComment);
routes.delete('/text/delete/:id', isLoggedIn, CommentController.deleteTextComment);
routes.post('/doc/:id', isLoggedIn, CommentController.createDocComment);
export default routes;
