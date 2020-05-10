const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  groupId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);