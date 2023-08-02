import Friends from '../model/friendship';

class friendshipService {
  static async createFreindship(accountOwner, friend) {
    try {
      return await Friends.create({ accountOwner, friend });
    } catch (error) {
      throw error;
    }
  }
}

export default friendshipService;
