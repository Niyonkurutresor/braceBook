/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  firstname: String,
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
  confirmPassword: String,
  profilepicture: String,
  coverPhoto: String,
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
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
