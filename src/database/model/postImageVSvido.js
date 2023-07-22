/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

// post secham
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  URL: {
    type: String,
    required: true,
  },

  publicId: {
    type: String,
    required: true,
    unique: true,
  },

  createAt: {
    type: Date,
    default: Date.now(),
  },
  postOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});

export const ImageVideo = mongoose.model('ImageVideo', PostSchema);
