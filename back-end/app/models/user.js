const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: Add custom validators and messages for required fields.

module.exports = mongoose.model('User', 
  new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }, { timestamps: true })
);