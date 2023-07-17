/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  emailVerficationToken: String,
  emailIsVelfied: {
    type: Boolean,
    default: false,
  },
  birthDate: Date,
  location: {
    latitude: {
      type: Number,
      default: 0
    },
    longitude: {
      type: Number,
      default: 0
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePicture: {
    URL: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
  coverPhoto: {
    URL: {
      type: String,
    },
    publicId: {
      type: String,
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'privat'],
    default: 'privat',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'groupAdmin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const User = mongoose.model('User', userSchema);

export default User;
