/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import CommentServicies from '../database/services/commentServcies.js';
import PostService from '../database/services/PostsServicies.js';
import picImagePost from '../database/services/imageVidosServicies.js';
import AppError from '../helper/AppError.js';
import response from '../helper/response.js';

class CommentController {
  static async createTextComment(req, res, next) {
    try {
      const { id } = req.params;
      const loggedin = req.user.id;
      const { commnetContent } = req.body;
      if (!commnetContent) return next(new AppError(400, 'Bad requst', 'coment content is required'));
      const post = await PostService.findPost(id);
      if (!post) return next(new AppError(404, 'Not found', 'Sorry post is not found'));
      const comment = await CommentServicies.createComment(id, loggedin, commnetContent);
      if (!comment) return next(new AppError(401, 'Fail', 'Comment fail, please try again'));
      await PostService.comment(id, comment._id);
      response(res, 200, 'you comment successfully.', comment.commnetContent);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async deleteTextComment(req, res, next) {
    try {
      const { id } = req.user;
      const comment = await CommentServicies.findComment(req.params.id);
      if (!comment) return next(new AppError(404, 'Not found', 'Comment not found.'));
      if (id !== comment.commnetFrom || id !== (await PostService.findPost(comment.postId)).postOwner.toString()) return next(new AppError(403, 'Forbidden', 'You are not allowed to delete this comment'));
      await CommentServicies.deleteComment(req.params.id);
      response(res, 200, 'Comment delete successfully.');
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async createDocComment(req, res, next) {
    try {
      const { id } = req.params;
      const loggedin = req.user.id;
      const { commnetContent } = req.body;
      if (!commnetContent) return next(new AppError(400, 'Bad requst', 'coment content is required'));
      const post = await picImagePost.findById(id);
      if (!post) return next(new AppError(404, 'Not found', 'Sorry post not found'));
      const comment = await CommentServicies.createComment(id, loggedin, commnetContent);
      if (!comment) return next(new AppError(401, 'Fail', 'Comment fail, please try again'));
      await picImagePost.comment(id, comment._id);
      response(res, 200, 'you comment successfully.', comment.commnetContent);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }
}

export default CommentController;
