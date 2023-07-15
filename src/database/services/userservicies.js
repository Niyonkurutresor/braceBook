/* eslint-disable max-len */
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

  static async findEmail(email) {
    try {
      return await User.findOne({ email }).select('+ password').select('+ userName').select('+ emailIsVelfied');
    } catch (error) {
      throw error;
    }
  }

  static async forgetPassword(email, passwordChangedAt, passwordResetToken, passwordResetExpired) {
    try {
      return await User.findOneAndUpdate({ email }, { passwordChangedAt, passwordResetToken, passwordResetExpired });
    } catch (error) {
      throw error;
    }
  }

  static async findUser(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(id, password, passwordChangedAt) {
    try {
      return await User.findOneAndUpdate({ _id: id }, { password, passwordChangedAt, passwordResetToken: null });
    } catch (error) {
      throw error;
    }
  }

  static async updatePassword(_id, password, passwordChangedAt) {
    try {
      return await User.findOneAndUpdate({ _id }, { password, passwordChangedAt });
    } catch (error) {
      throw error;
    }
  }

  static async createUserProfileInfo(email, firstName, lastName, birthDate, gender) {
    try {
      return await User.findOneAndUpdate({ email }, {
        firstName, lastName, birthDate, gender
      });
    } catch (error) {
      throw error;
    }
  }

  static async findUserById(_id) {
    try {
      return await User.findOne({ _id });
    } catch (error) {
      throw error;
    }
  }

  static async updateUserProfile(email, info) {
    try {
      return await User.findOneAndUpdate({ email }, info);
    } catch (error) {
      throw error;
    }
  }

  static async createUserProfilePicture(email, info) {
    try {
      return await User.findOneAndUpdate({ email }, { profilePicture: info });
    } catch (error) {
      throw error;
    }
  }

  static async updateProflePicture(email, info) {
    try {
      return await User.findOneAndUpdate({ email }, { profilePicture: info });
    } catch (error) {
      throw error;
    }
  }

  static async coverphoto(email, info) {
    try {
      return await User.findOneAndUpdate({ email }, { coverPhoto: info });
    } catch (error) {
      throw error;
    }
  }
}

export default USerServicies;
