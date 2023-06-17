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
}
