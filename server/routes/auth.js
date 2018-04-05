const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res) => {
  mongoose.connect(`mongodb://localhost/${req.body.workspace}`);
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    User.create(userData, (error, user) => {
      if (error) {
        return res.json({ message: 'exist' });
      }
      return res.json({ message: user });
    });
  });
});

router.post('/login', (req, res) => {
  mongoose.connect(`mongodb://localhost/${req.body.workspace}`);
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    User.authenticate(req.body.email, req.body.password, (error, user) => {
      if (error || !user) {
        return res.json({ message: 'error', data: error });
      }
      res.json({ message: user });
    });
  });
});

module.exports = router;
