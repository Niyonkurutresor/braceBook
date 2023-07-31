/* eslint-disable no-return-await */
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

  static async findPost(id) {
    try {
      return await Post.findById(id);
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

  static async updatePost(id, postContent) {
    try {
      return await Post.findOneAndUpdate({ _id: id }, { postContent });
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id) {
    try {
      return await Post.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  static async createTextPost(data) {
    try {
      return await Post.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async findSinglePost(id) {
    try {
      return await Post.findById(id).populate({ path: 'postOwner', select: '-_id userName profilePicture' });
    } catch (error) {
      throw error;
    }
  }

  static async likePost(id, userId) {
    try {
      return await Post.findByIdAndUpdate(id, { $push: { likes: userId } });
    } catch (error) {
      throw error;
    }
  }

  static async desilikePost(id, userId) {
    try {
      return await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } catch (error) {
      throw error;
    }
  }

  static async findById2(id) {
    try {
      return await Post.findById(id).populate({ path: 'likes', select: '-_id userName' });
    } catch (error) {
      throw error;
    }
  }
}

export default PostServicies;
