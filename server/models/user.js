const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email })
    .exec((err, user) => {
      if (err) {
        return callback('Server Error');
      } else if (!user) {
        return callback('Unregistered User');
      }
      bcrypt.compare(password, user.password, (error, result) => {
        if (result === true) {
          return callback(null, user);
        }
        return callback('Invalid Password');
      });
    });
};


// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    return next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
