

const path = require('path');
const express = require('express');

const router = express.Router();
const User = require('../models/user');

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
    res.json({ message: 'success', data: user });
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

module.exports = router;
