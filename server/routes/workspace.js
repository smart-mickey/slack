const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const router = express.Router();
const User = require('../models/user');
const WorkSpace = require('../models/workspace');
const Channel = require('../models/channel');

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

const createGeneralChannel = (workspace) => {
  mongoose.connect(`mongodb://localhost/${workspace}`);
  const db = mongoose.connection;
  db.on('error', () => console.log('Init general channel failed'));
  db.once('open', () => {
    const chat = [];
    Channel.ChannelModel.create({
      channel_name: 'general',
      chat,
      member: [],
    }, (error, data) => {
      if (error) {
        console.log('Init general channel failed');
      }
      console.log('Init general channel successed');
    });
  });
};

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
      createGeneralChannel(req.body.displayname);
      const message = {
        fullName: workspace.fullName,
        displayName: workspace.displayName,
        admin: workspace.admin,
      };
      res.json({ status: 'success', message });
    });
  });
});

const sendEmail = (email, link) => {
  nodemailer.createTestAccount((err, account) => {
    console.log(email);
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass,
      },
    });

    // setup email data with unicode symbols
    const mailOptions = {
      from: 'litian19901120@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Here is your workspace link', // plain text body
      html: link, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};


router.post('/getWorkSpaceLink', (req, res) => {
  mongoose.connect('mongodb://localhost/all-workspace');
  const db = mongoose.connection;
  db.on('error', () => res.json({ message: 'Network Error' }));
  db.once('open', () => {
    const param = {
      admin: req.body.email,
    };
    console.log(param.admin);
    WorkSpace.findOne(param)
      .exec((err, workspace) => {
        if (err) {
          res.json({ status: 'error', message: 'Network Error' });
        } else if (!workspace) {
          res.json({ status: 'error', message: 'You have no your own workspace' });
        } else {
          // send workspace link to the email
          console.log(`sending workspace link to ${param.admin}`);
          console.log(`workspace link is /workspace/${workspace.displayName}`);
          sendEmail(param.admin, `http://localhost:3000/workspace/${workspace.displayName}`);
          res.json({ status: 'success' });
        }
      });
  });
});

module.exports = router;
