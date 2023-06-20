/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: String,
  firstname: String,
  lastName: String,
  email: {
    type: String,
    required: true,
  },
  age: Number,
  location: String,
  password: {
    type: String,
    select: false,
  },
  confirmPassword: String,
  profilepicture: String,
  coverPhoto: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Privat'],
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
});

const User = mongoose.model('User', userSchema);

export default User;
