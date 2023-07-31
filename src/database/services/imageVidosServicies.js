/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { ImageVideo } from '../model/postImageVSvido.js';

class postPictureVideoService {
  static async createPost(data) {
    try {
      return await ImageVideo.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(publicId, data) {
    try {
      return await ImageVideo.findOneAndUpdate({ publicId }, data);
    } catch (error) {
      throw error;
    }
  }

  static async findPost(publicId) {
    try {
      return await ImageVideo.findOne({ publicId });
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(publicId) {
    try {
      return await ImageVideo.deleteOne({ publicId });
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await ImageVideo.findById(id);
    } catch (error) {
      throw error;
    }
  }

  static async findById2(id) {
    try {
      return await ImageVideo.findById(id).populate({ path: 'likes', select: '-_id userName' });
    } catch (error) {
      throw error;
    }
  }

  static async likePost(id, loggedin) {
    try {
      return await ImageVideo.findByIdAndUpdate(id, { $push: { likes: loggedin } });
    } catch (error) {
      throw error;
    }
  }

  static async unLikePost(id, loggedin) {
    try {
      return await ImageVideo.findByIdAndUpdate(id, { $pull: { likes: loggedin } });
    } catch (error) {
      throw error;
    }
  }

  static async comment(id, commentId) {
    try {
      return await ImageVideo.findByIdAndUpdate(id, { $push: { comments: commentId } });
    } catch (error) {
      throw error;
    }
  }
}

export default postPictureVideoService;
