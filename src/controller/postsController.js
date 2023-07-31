/* eslint-disable no-return-await */
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

  static async updatePost(req, res, next) {
    try {
      const postId = req.params.id;
      const { postContent } = req.body;
      if (!postContent || postContent === '') return next(new AppError(400, 'Fail', 'Please provide new content to replace old one.'));
      const post = await PostServicies.findPost(postId);
      if (!post) return next(new AppError(404, 'Not found', 'There is no post with such Id'));
      if ((post.postOwner).toString() !== req.user.id) return next(new AppError(403, 'Forbiden', 'You are not allowed to update others content'));
      const updates = await PostServicies.updatePost(postId, postContent);
      if (!updates) return next(new AppError(400, 'Fail', 'Fail to update user post. Try again.'));
      outPut(res, 200, 'Post updated successfuly!', updates);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await PostServicies.findPost(id);
      if (!post) return next(new AppError(400, 'Fail', 'There is no Post with such Id'));
      if ((post.postOwner).toString() !== req.user.id) return next(new AppError(403, 'Forbiden', 'Please login as owner of post to delete the post'));
      const deleted = await PostServicies.deletePost(id);
      if (!deleted) return next(new AppError(400, 'Fail', 'Something went wront. please try again'));
      outPut(res, 200, 'Post deleted successfully!');
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async createPost(req, res, next) {
    try {
      const postOwner = req.user.id;
      const postContent = req.body.text;
      if (!postContent) return next(new AppError(400, 'Fail', 'please provide content'));
      const post = await PostServicies.createTextPost({ postOwner, postContent });
      if (!post) return next(new AppError(400, 'Fail', 'Somethng went wrong. Please try again'));
      outPut(res, 200, 'Post created successfully!', post);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async getpost(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(new AppError(400, 'Bad request', 'Id fo the post is required.'));
      const post = await PostServicies.findSinglePost(id);
      if (!post) return next(new AppError(404, 'Not found', 'There is no post with such Id.'));
      outPut(res, 200, 'Post found successfully!', post);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async like(req, res, next) {
    try {
      const { id } = req.params;
      const loggedin = req.user.id;
      if (!id) return next(new AppError(400, 'Bad request', 'Id for the post is required'));
      const post = await PostServicies.findPost(id);
      if (!post) return next(new AppError(404, 'Not found', 'Post not found.'));
      // dislike
      const postLikes = post.likes;
      const result = postLikes.includes(loggedin);
      if (result) {
        await PostServicies.desilikePost(id, loggedin);
        return outPut(res, 200, 'You unLiked Post successfully.');
      }
      // like
      const like = await PostServicies.likePost(id, loggedin);
      if (!like) return next(new AppError(400, 'Fail', 'Something went wrong try again'));
      outPut(res, 200, 'Post liked successfully.', like);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async likeNumber(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) return next(new AppError(400, 'Bad request', 'Please select post.'));
      const post = await PostServicies.findById2(id);
      if (!post) return next(new AppError(400, 'Bad request', 'Something went wrong, pleas try again later or contact support team.'));
      const numberOfLikes = post.likes.reverse().length;
      switch (numberOfLikes) {
        case 0:
          outPut(res, 200, 'No one likes your poar');
          break;
        case 1:
          outPut(res, 200, `${post.likes[0].userName}  likes your post`, numberOfLikes);
          break;
        case 2:
          outPut(res, 200, `${post.likes[0].userName} and ${post.likes[1].userName} likes your post`, numberOfLikes);
          break;
        case 3:
          outPut(res, 200, `${post.likes[0].userName}, ${post.likes[1].userName} and ${post.likes[2].userName} likes your post`, numberOfLikes);
          break;
        case 4:
          outPut(res, 200, `${post.likes[0].userName}, ${post.likes[1].userName} and ${numberOfLikes - 2} others likes your post`, numberOfLikes);
          break;

        default:
          outPut(res, 200, 'something went wrong.');
          break;
      }
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }

  static async likeDescription(req, res, next) {
    try {
      const { id } = req.params;
      const post = await PostServicies.findById2(id);
      if (!post) return next(new AppError(400, 'Bad request', 'Something went wrong, pleas try again later or contact support team.'));
      const result = post.likes.reverse();
      const userNames = result.map((person) => person.userName);
      outPut(res, 200, 'people likes your post', userNames);
    } catch (error) {
      next(new AppError(500, 'INTERNAL SERVER ERROR', error));
    }
  }
}
