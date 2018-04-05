const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');
const WorkSpace = require('../models/workspace');


router.post('/checkWorkSpace', (req, res) => {
  mongoose.connect('mongodb://localhost/all-workspace');
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    const displayName = req.body.name;
    WorkSpace.findOne({ displayName })
      .exec((err, workspace) => {
        if (err) {
          res.json({ status: 'error', message: 'Network Error' });
        } else if (!workspace) {
          res.json({ status: 'error', message: `The workspace <${displayName}> is not exist.` });
        } else {
          const message = {
            fullName: workspace.fullName,
            displayName,
            admin: workspace.admin,
          };
          res.json({ status: 'success', message });
        }
      });
  });
});

router.get('/getWorkSpace', (req, res) => {
  mongoose.connect('mongodb://localhost/all-workspace');
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    WorkSpace.find((error, data) => {
      if (error) {
        return res.json({ status: 'error', message: 'Server Error' });
      }
      return res.json({ status: 'success', message: data });
    });
  });
});

router.post('/createWorkSpace', (req, res) => {
  mongoose.connect('mongodb://localhost/all-workspace');
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    const param = {
      fullName: req.body.fullname,
      displayName: req.body.displayname,
      admin: req.body.admin,
      password: req.body.password,
      updated_at: new Date().getTime(),
    };
    console.log(param);
    WorkSpace.create(param, (error, workspace) => {
      if (error) {
        return res.json({ status: 'error', message: 'Already exist or Server Error' });
      }
      const message = {
        fullName: workspace.fullName,
        displayName: workspace.displayName,
        admin: workspace.admin,
      };
      res.json({ status: 'success', message });
    });
  });
});

module.exports = router;
