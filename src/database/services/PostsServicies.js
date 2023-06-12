/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
/* eslint-disable import/no-extraneous-dependencies */
import Post from '../model/posts.js';

class PostServicies {
  static async createPosts(data) {
    try {
      return await Post.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async deletePosts() {
    try {
      return await Post.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  static async getComments() {
    try {
      return await Post.find();
    } catch (error) {
      throw error;
    }
  }

  static async getcomment(id) {
    try {
      return await Post.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default PostServicies;
