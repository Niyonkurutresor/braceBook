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
}

export default postPictureVideoService;
