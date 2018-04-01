

const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();
const User = require('../models/user');
const Channel = require('../models/channel');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const hPort = process.env.PORT || 3002;

http.listen(hPort, () => {
  console.log(`Socket listening on *:${hPort}`);
});

router.post('/register', (req, res) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  User.create(userData, (error, user) => {
    if (error) {
      return res.json({ message: 'exist' });
    }
    res.json({ message: user });
  });
});

router.post('/login', (req, res) => {
  User.authenticate(req.body.email, req.body.password, (error, user) => {
    if (error || !user) {
      return res.json({ message: 'error', data: error });
    }
    res.json({ message: user });
  });
});

const filterByTime = (chat, day) => {
  const CT = new Date().getTime();
  const result = [];
  chat.map((item, index) => {
    // console.log(`${item.updated_at}, ${CT + day}`);
    if (item.updated_at > CT - day) result.push(item);
    return true;
  });
  return result;
};

router.get('/fetchChatData/:channel/:day', (req, res) => {
  const channel_name = req.params.channel;
  const day = req.params.day * 86400000;

  Channel.ChannelModel.findOne({ channel_name })
    .exec((err, channel) => {
      if (err) {
        res.json({ status: 'error', message: 'Server error or the Chat room has been removed.' });
      } else if (!channel) {
        res.json({ status: 'error', message: 'The Chat room has been removed.' });
      } else {
        const filteredChat = filterByTime(channel.chat, day);
        res.json({ status: 'success', message: filteredChat });
      }
    });
});

router.get('/getUserData/:userId', (req, res) => {
  const _id = req.params.userId;
  User.findOne({ _id })
    .exec((err, user) => {
      if (err) {
        res.json({ error: err.toString() });
      } else if (!user) {
        res.json({ status: 'removed' });
      } else {
        res.json({ status: 'success', data: user });
      }
    });
});

router.post('/sendMessage', (req, res) => {
  const channel_name = req.body.channel;
  const chatData = {
    userId: req.body.userId,
    message: req.body.message,
    updated_at: new Date().getTime(),
  };
  Channel.ChannelModel.findOne({ channel_name })
    .exec((err, channel) => {
      if (err) {
        res.json({ status: 'error', message: 'Server error' });
      } else if (!channel) {
        const chat = [];
        chat.push(chatData);
        Channel.ChannelModel.create({
          channel_name: 'general',
          chat,
          member: [chatData.userId],
        }, (error, data) => {
          if (error) {
            return res.json({ message: 'Server error' });
          }
          res.json({ message: 'success', data: data.chat });
        });
      } else {
        const temp = channel;
        const chat_history = channel.chat;
        chat_history.push(chatData);
        temp.chat = chat_history;
        Channel.ChannelModel.findOneAndUpdate(
          { channel_name },
          { $set: { chat: chat_history } },
          (e, doc) => {
            if (e) {
              return res.json({ message: 'Server error' });
            }
          },
        );
        res.json({ status: 'success', message: 'Sent message successfully!' });
      }
    });
});

io.on('connection', (socket) => {
  console.log('Socket connected');
  socket.on('message added', (param) => {
    io.sockets.emit('message added', {});
  });
});

module.exports = router;
