const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const WorkSpaceSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  displayName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  admin: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  updated_at: {
    type: String,
    required: true,
    trim: true,
  },
});

// hashing a password before saving it to the database
WorkSpaceSchema.pre('save', function (next) {
  const workspace = this;
  bcrypt.hash(workspace.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    workspace.password = hash;
    return next();
  });
});

const WorkSpace = mongoose.model('WorkSpace', WorkSpaceSchema);
module.exports = WorkSpace;
