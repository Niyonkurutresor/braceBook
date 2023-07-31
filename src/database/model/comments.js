/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
  },
  commnetFrom: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
  },
  commnetContent: {
    type: String,
  }
});

export const Comment = mongoose.model('Comment', commentSchema);
