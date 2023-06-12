/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  postOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  timePassed: String,
  postContent: String,
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

const Post = mongoose.model('Post', postSchema);

export default Post;
