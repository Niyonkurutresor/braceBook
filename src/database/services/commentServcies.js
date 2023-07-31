/* eslint-disable no-return-await */
/* eslint-disable import/extensions */
import { Comment } from '../model/comments.js';

class CommentServicies {
  static async createComment(postId, commnetFrom, commnetContent) {
    try {
      return await Comment.create({ postId, commnetFrom, commnetContent });
    } catch (error) {
      throw error;
    }
  }
}

export default CommentServicies;
