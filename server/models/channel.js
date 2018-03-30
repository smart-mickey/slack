const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ChatBubbleSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
});

const MemberSchema = new mongoose.Schema({
  userId: {
    type: Array,
    unique: true,
    required: true,
    trim: true,
  },
});

const ChannelSchema = new mongoose.Schema({
  channel_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  chat: {
    type: Array,
    unique: true,
    required: true,
    trim: true,
  },
  member: {
    type: Array,
    required: true,
  },
});

const ChannelModel = mongoose.model('Channel', ChannelSchema);
const ChannelBubbleModel = mongoose.model('Bubble', ChatBubbleSchema);
const Channel = {
  ChannelModel,
  ChannelSchema,
  ChatBubbleSchema,
  MemberSchema,
  ChannelBubbleModel,
};
module.exports = Channel;
