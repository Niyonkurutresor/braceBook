/* eslint-disable import/extensions */
/* eslint-disable no-useless-catch */
import User from '../model/user.js';

class USerServicies {
  static async createUsers(data) {
    try {
      return await User.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteUsers() {
    try {
      return await User.deleteMany();
    } catch (error) {
      throw error;
    }
  }

  static async emailVerfication(emailVerficationToken) {
    try {
      return await User.findOne({ emailVerficationToken });
    } catch (error) {
      throw error;
    }
  }

  static async updateEmailverfication(emailVerficationToken) {
    try {
      return await User.findOneAndUpdate({ emailVerficationToken }, { emailIsVelfied: true, emailVerficationToken: '' });
    } catch (error) {
      throw error;
    }
  }
}

export default USerServicies;
