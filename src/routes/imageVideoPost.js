/* eslint-disable import/extensions */
import express from 'express';
import imageVideoController from '../controller/postPictureVSvideo.js';
import { isLoggedIn } from '../middleware/authorization copy.js';

const route = express();

route.post('/CreateCloudinaryPost', isLoggedIn, imageVideoController.postPicVSvideo);
route.post('/updatepost/:id', isLoggedIn, imageVideoController.updatePost);
route.delete('/deletePost/:id', isLoggedIn, imageVideoController.deletePost);
route.post('/like/:id', isLoggedIn, imageVideoController.like);
route.get('/likes/:id', imageVideoController.likeNumber);
route.get('/likeDescription/:id', imageVideoController.likeDescription);

export default route;
