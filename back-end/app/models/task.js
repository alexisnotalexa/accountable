const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'incomplete',
    enum: ['completed', 'incomplete']
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  completedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);