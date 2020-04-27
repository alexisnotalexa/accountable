const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('users', 
  new Schema({
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }, { timestamps: true })
);