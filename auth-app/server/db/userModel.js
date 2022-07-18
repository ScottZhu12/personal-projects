const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    unique: false,
  },
});

const userModel = mongoose.model('Users', UserSchema);

module.exports = userModel;
