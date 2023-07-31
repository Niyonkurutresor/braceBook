/* eslint-disable import/extensions */
import express from 'express';
import imageVideoController from '../controller/postPictureVSvideo.js';

const route = express();

route.post('/CreateCloudinaryPost', imageVideoController.postPicVSvideo);
route.post('/updatepost/:id', imageVideoController.updatePost);
route.delete('/deletePost/:id', imageVideoController.deletePost);
route.post('/like/:id', imageVideoController.like);
route.get('/likes/:id', imageVideoController.likeNumber);
route.get('/likeDescription/:id', imageVideoController.likeDescription);

export default route;
