/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import friendshipController from '../controller/friendshipController.js';
import { isLoggedIn } from '../middleware/authorization copy.js';

const routes = express();

routes.post('/friendRequest/:id', isLoggedIn, friendshipController.friendRequest);
routes.post('/acceptRejectFriendRequest/:action/:reqID', isLoggedIn, friendshipController.acceptRejectFriendRequest);

export default routes;
