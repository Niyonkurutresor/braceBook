/* eslint-disable import/extensions */
import Friends from '../model/friendship.js';

class friendshipService {
  static async createFreindship(senderId, receiverId) {
    try {
      return await Friends.create({ senderId, receiverId });
    } catch (error) {
      throw error;
    }
  }

  static async fidnById(id) {
    try {
      return await Friends.findById(id);
    } catch (error) {
      throw error;
    }
  }
}

export default friendshipService;
