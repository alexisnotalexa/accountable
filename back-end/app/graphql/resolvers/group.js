const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./authorization');
const Group = require('../../models/group');
const User = require('../../models/user');
const Task = require('../../models/task');

module.exports = {
  Query: {
    // TODO: Need to add authentication
    getAllGroups: async () => {
      try {
        const results = await Group.find();
        console.log(results);
        return results;
        // return await Group.find();
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
    // TODO: Need to add authentication
    createGroup: async (_, args) => {
      try {
        const { name, description, members, createdBy } = args.group;
        const user = await User.findById(createdBy);
        if (!user) throw new Error('No user found.');

        const membersFound = await User.find({ _id: { $in: members } });
        if (membersFound.length !== members.length) {
          throw new Error('You can only create a group with valid users.');
        }

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
    deleteGroup: combineResolvers(
      isAuthenticated,
      async (_, { id }, { authUser }) => {
        try {
          const group = await Group.findById(id);
          if (!group) throw new Error('No group found.');
          if (group.createdBy.toString() !== authUser.id.toString()) {
            throw new Error("Group can only be deleted by the group's creator.");
          }
          
          const result = await group.deleteOne();
          return result.deletedCount === 1;
        } catch (error) {
          throw new Error(error);
        }
      }
    ),
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