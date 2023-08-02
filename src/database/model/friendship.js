import mongoose from 'mongoose';

const friendshipSchema = new mongoose.Schema({
  accountOwner: {
    type: mongoose.Schema.Object,
    ref: 'User',
  },
  friend: {
    type: mongoose.Schema.Object,
    ref: 'User',
  }
});

const Friends = mongoose.model('Friends', friendshipSchema);
export default Friends;
