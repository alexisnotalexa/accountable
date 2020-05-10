const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTaskSchema = new Schema({
  compeleted: {
    type: Boolean,
    default: false,
    required: true
  },
  compeletedAt: {
    type: Date
  },
  taskId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('UserTask', UserTaskSchema);