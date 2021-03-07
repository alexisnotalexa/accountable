const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);