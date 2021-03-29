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

GroupSchema.pre('deleteOne', { document: true}, function(next) {
  // Removes deleted group from the users created groups
  this.model('User').updateOne(
    { _id: this.createdBy },
    { $pull: { groups: this._id }},
    { multi: true },
    next
  );
  // TODO: Need to delete any tasks associated to this group
});

module.exports = mongoose.model('Group', GroupSchema);