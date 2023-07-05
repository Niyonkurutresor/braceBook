/* eslint-disable import/extensions */
import express from 'express';
import imageVideoController from '../controller/postPictureVSvideo.js';

const route = express();

route.post('/CreateCloudinaryPost', imageVideoController.postPicVSvideo);
route.post('/updatepost/:id', imageVideoController.updatePost);
route.delete('/deletePost/:id', imageVideoController.deletePost);

export default route;
