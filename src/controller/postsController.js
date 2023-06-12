/* eslint-disable consistent-return */
import PostServicies from '../database/services/PostsServicies';
import out from '../helper/response';
import AppError from '../helper/AppError';

class PostsController {
  static async getPosts(req, res, next) {
    const posts = await PostServicies.getComments();
    if (!posts) return next(new AppError(404, 'Fail', 'Posts are not found.'));
    out(res, 200, `Post retireved successfully! ${posts}`);
  }
}

export default PostsController;
