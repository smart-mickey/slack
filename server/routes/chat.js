const express = require('express');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Channel = require('../models/channel');
const User = require('../models/user');

const hPort = process.env.PORT || 3002;

http.listen(hPort, () => {
  console.log(`Socket listening on *:${hPort}`);
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

router.get('/fetchChatData/:workspace/:channel/:day', (req, res) => {
  mongoose.connect(`mongodb://localhost/${req.params.workspace}`);
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    console.log(`${req.params.workspace} database is running`);
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
  mongoose.connect(`mongodb://localhost/${req.body.workspace}`);
  const db = mongoose.connection;
  db.on('error', () => res.json({ status: 'error', message: 'This workspace has been removed' }));
  db.once('open', () => {
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
          res.json({ status: 'error', message: 'The Chat room has been removed.' });
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
                return res.json({ status: 'error', message: 'Server error' });
              }
            },
          );
          res.json({ status: 'success', message: 'Sent message successfully!' });
        }
      });
  });
});

io.on('connection', (socket) => {
  console.log('Socket connected');
  socket.on('message added', (param) => {
    io.sockets.emit('message added', { workspace: param.workspace });
  });
});

module.exports = router;
