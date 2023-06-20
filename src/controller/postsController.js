/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import PostServicies from '../database/services/PostsServicies.js';
import AppError from '../helper/AppError.js';
import outPut from '../helper/response.js';
import skip from '../helper/requestFilter.js';

export class PostsController {
  static async getPosts(req, res, next) {
    try {
      const totaldocs = await PostServicies.getPostsNumber();
      const totalpages = Math.ceil(totaldocs / req.query.limit);
      const docsOnPage = skip(req.query.page || 1, req.query.limit);
      if (req.query.page <= 0 || req.query.page > totalpages) return next(new AppError(400, 'Fail', 'Invalid page number'));
      const posts = await PostServicies.getPagnatedPosts(docsOnPage, req.query.limit);
      if (!posts) return next(new AppError(404, 'Fail', 'Posts are not found'));
      outPut(res, 200, 'Posts retreived successfully!', posts);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

 static async updatePost(req,res,next) {
  try {
    const { postContent }= req.body;
    if(!postContent || postContent == '') return next(new AppError(400, 'Fail', 'Please provide new content to replace old one.'));
    const updates = await PostServicies.updatePost(req.params.id, postContent);
    if(!updates) return next(new AppError(400, 'Fail', 'Fail to update user post. Try again.'));
    outPut(res, 200, 'Post updated successfuly!', updates);
  } catch (error) {
    next(new AppError(500, 'INTERNAL SERVER ERROR', error));
  }
 }

 static async deletePost(req,res,next) {
  try {
    const id = req.params.id;
    const post = await PostServicies.findPost(id);
    if(!post) return next(new AppError(400, 'Fail', 'There is no Post with such Id'));
    const deleted = await PostServicies.deletePost(id)
    if(!deleted) return next(new AppError(400,'Fail', 'Something went wront. please try again'));
    outPut(res,200,'Post deleted successfully!');
  } catch (error) {
    next(new AppError(500, 'INTERNAL SERVER ERROR', error));
  }
 }
}
