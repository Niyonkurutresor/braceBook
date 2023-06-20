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

  static async getPostsNumber() {
    try {
      return await Post.find().count();
    } catch (error) {
      throw error;
    }
  }

  static async getPagnatedPosts(skip, limit) {
    try {
      return await Post.find().sort({ timePassed: 1 }).limit(limit).skip(skip);
    } catch (error) {
      throw error;
    }
  }

  static async getPost(id) {
    try {
      return await Post.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default PostServicies;
