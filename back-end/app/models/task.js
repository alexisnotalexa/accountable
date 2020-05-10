const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String
  }
});

module.exports = mongoose.model('Task', TaskSchema);