const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', 
  new Schema({
    firstName: {
      type: String,
      required: [true, 'First name field is required.']
    },
    lastName: {
      type: String,
      required: [true, 'Last name field is required.']
    },
    email: {
      type: String,
      required: [true, 'A valid email address is required.'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'A valid password is required.'],
      validate: {
        validator: (password) => {
          return password.length >= 6;
        },
        message: 'Your password must be at least 6 characters.'
      }
    }
  }, { timestamps: true })
);