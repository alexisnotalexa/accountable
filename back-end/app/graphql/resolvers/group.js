const Group = require('../../models/group');
const User = require('../../models/user');
const Task = require('../../models/task');

module.exports = {
  Query: {
    // need to add authorization
    getAllGroups: async () => {
      try {
        const groups = await Group.find();
        return groups.map(group => ({
          ...group._doc,
          _id: group.id,
          createdAt: new Date(group.createdAt).toISOString(),
          updatedAt: new Date(group.updatedAt).toISOString()
        }));
      } catch (error) {
        throw new Error(error);
      }
    },
    getGroupsCreatedByUser: async (_, { id }) => {
      try {
        const groups = await Group.find({ createdBy: id });
        return groups.map(group => ({
          ...group._doc,
          _id: group.id,
          createdAt: new Date(group.createdAt).toISOString(),
          updatedAt: new Date(group.updatedAt).toISOString()
        }));
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    // need to add authorization
    createGroup: async (_, args) => {
      try {
        const { name, description, members, createdBy } = args.group;
        const user = await User.findById(createdBy);
        if (!user) throw new Error('No user found.');

        // TODO: Need to check that all members are valid users
        const group = await Group.create({
          name,
          description,
          members,
          createdBy
        });

        user.groups = [...user.groups, group._id];
        await user.save();

        return group;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteGroup: async (_, { id }) => {
      try {
        // TODO: Group can only be deleted by group creator
        const result = await Group.deleteOne({ _id: id });
        return result.deletedCount === 1 ? true : false;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateGroup: async (_, { id, name, description }) => {
      try {
        // TODO: Be able to add/remove group members?
        return await Group.findByIdAndUpdate(id, { name, description }, { new: true });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Group: {
    members: async ({ members }) => {
      try {
        return await User.find({ '_id': { $in: members }});
      } catch (error) {
        throw new Error(error);
      }
    },
    tasks: async ({ tasks }) => {
      try {
        return await Task.find({ '_id': { $in: tasks }});
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};