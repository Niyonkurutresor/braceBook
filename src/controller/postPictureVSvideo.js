/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import postPictureVideoService from '../database/services/imageVidosServicies.js';
import response from '../helper/response.js';
import AppError from '../helper/AppError.js';
import cloudinary from '../helper/claudinaryConfiguration.js';
import upload from '../helper/multerConfiguration.js';

class imageVideoController {
  static async postPicVSvideo(req, res, next) {
    upload(req, res, async (err) => {
      if (err) {
        next(new AppError(400, 'Fail', err));
      }
      try {
        const { title } = req.body;
        if (req.file) {
          try {
            let result;
            if (req.file.mimetype.includes('video')) {
              result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'video' });
            } else if (req.file.mimetype.includes('image')) {
              result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image' });
            }
            const URL = result.secure_url;
            const publicId = result.public_id;
            await postPictureVideoService.createPost({ title, URL, publicId });
            response(res, 201, 'Created successfully!', result.secure_url);
            fs.unlinkSync(req.file.path);
          } catch (error) {
            fs.unlinkSync(req.file.path);
            throw error;
          }
        }
      } catch (error) {
        next(new AppError(500, 'Fail', error));
      }
    });
  }

  static async updatePost(req, res, next) {
    upload(req, res, async (err) => {
      const fileId = req.params.id;
      const PublicPostId = await postPictureVideoService.findPost(fileId);
      if (!PublicPostId) return next(new AppError(404, 'Not found', 'There is no post with such Id'));
      if (err) {
        next(new AppError(400, 'Fail', err));
      }
      try {
        const { title } = req.body;
        if (req.file) {
          try {
            let result;
            if (req.file.mimetype.includes('video')) {
              result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'video', public_id: fileId });
            } else if (req.file.mimetype.includes('image')) {
              result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image', public_id: fileId });
            }
            const URL = result.secure_url;
            await postPictureVideoService.updatePost(fileId, { title, URL });
            response(res, 201, 'Post is updated successfuly!', result.secure_url);
            fs.unlinkSync(req.file.path);
          } catch (error) {
            fs.unlinkSync(req.file.path);
            throw error;
          }
        }
      } catch (error) {
        next(new AppError(500, 'Fail', error));
      }
    });
  }

  static async deletePost(req, res, next) {
    try {
      const publicId = req.params.id;
      const result = await postPictureVideoService.findPost(publicId);
      if (!result) return next(new AppError(404, 'Not found', 'Thereis no such post available'));
      await cloudinary.v2.uploader.destroy(publicId);
      await postPictureVideoService.deletePost(publicId);
      res.status(200).json({ message: 'Deleted successfuly' });
    } catch (error) {
      throw error;
    }
  }

  static async like(req, res, next) {
    try {
      const { id } = req.params;
      const loggedin = req.user.id;
      if (!id) return next(new AppError(400, 'Bad request', 'Post id is required'));
      const post = await postPictureVideoService.findById(id);
      if (!post) return next(new AppError(404, 'Not found', 'Post not found.'));
      // unLike
      const postLikes = post.likes;
      const result = postLikes.includes(loggedin);
      if (result) {
        await postPictureVideoService.unLikePost(id, loggedin);
        return response(res, 200, 'You unLiked Post successfully.');
      }
      // like
      const like = await postPictureVideoService.likePost(id, loggedin);
      if (!like) return next(new AppError(400, 'Fail', 'Something went wrong try again'));
      response(res, 200, 'Post liked successfully.', like);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async likeNumber(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(new AppError(400, 'Bad request', 'Please select post.'));
      const post = await postPictureVideoService.findById2(id);
      if (!post) return next(new AppError(400, 'Bad request', 'Something went wrong, pleas try again later or contact support team.'));
      const numberOfLikes = post.likes.reverse().length;
      switch (numberOfLikes) {
        case 0:
          response(res, 200, 'No one likes your picture');
          break;
        case 1:
          response(res, 200, `${post.likes[0].userName} likes your post`, numberOfLikes);
          break;
        case 2:
          response(res, 200, `${post.likes[0].userName} and ${post.likes[1].userName} likes your post`, numberOfLikes);
          break;
        case 3:
          response(res, 200, `${post.likes[0].userName}, ${post.likes[1].userName} and ${post.likes[2].userName} likes your post`, numberOfLikes);
          break;
        case 4:
          response(res, 200, `${post.likes[0].userName}, ${post.likes[1].userName} and ${numberOfLikes - 2} others likes your post`, numberOfLikes);
          break;

        default:
          response(res, 200, 'something went wrong.');
          break;
      }
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async likeDescription(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postPictureVideoService.findById2(id);
      if (!post) return next(new AppError(400, 'Bad request', 'Something went wrong, pleas try again later or contact support team.'));
      const result = post.likes.reverse();
      const userNames = result.map((person) => person.userName);
      response(res, 200, 'people likes your post', userNames);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  // static async comment(req, res, next) {
  //   try {
  //     const { id } = req.params;
  //     const loggedin = req.user.id;
  //     if (!id) return next(new AppError(400, 'Bad request', 'Post id is required'));
  //     const post = await postPictureVideoService.findById(id);
  //     if (!post) return next(new AppError(404, 'Not found', 'Post not found.'));
  //     // comment
  //     const postCommetns = post.comments;

  //   } catch (error) {
  //     next(new AppError(500, 'INTERNAL SERVER ERROR', error));
  //   }
  // }
}

export default imageVideoController;
