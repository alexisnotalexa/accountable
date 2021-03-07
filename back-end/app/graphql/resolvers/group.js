const { model } = require('../../models/group');
const Group = require('../../models/group');
const User = require('../../models/user');
const mongoose = require('mongoose');

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
    // getGroupsByUserId: async (_, { userId }) => {
    //   try {
    //     let groupIds = await GroupMember.find({ userId });
    //     groupIds = groupIds.map(group => group.groupId);
    //     const groups = await Group.find({ _id: { $in: groupIds } });
    //     return groups.map(group => ({
    //       ...group._doc,
    //       _id: group.id,
    //       createdAt: new Date(group.createdAt).toISOString(),
    //       updatedAt: new Date(group.updatedAt).toISOString()
    //     }));
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
    getGroupsCreatedByUser: async (_, { userId }) => {
      try {
        const groups = await Group.find({ createdBy: userId });
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
    // addGroupMember: async (_, { groupId, userId }) => {
    //   try {
    //     const groupMember = await GroupMember.findOne({ groupId, userId });
    //     if (groupMember) throw new Error('User already exists in this group.');

    //     await GroupMember.create({
    //       groupId,
    //       userId
    //     });
    //     return true;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
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
        const result = await Group.deleteOne({ _id: id });
        return result.deletedCount === 1 ? true : false;
      } catch (error) {
        throw new Error(error);
      }
    },
    // removeGroupMember: async (_, { groupId, userId }) => {
    //   try {
    //     // TODO: Can't remove task creator
    //     const result = await GroupMember.deleteOne({ groupId, userId });
    //     return result.deletedCount === 1 ? true : false;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
    updateGroup: async (_, { id, name }) => {
      try {
         return await Group.findByIdAndUpdate(id, { name }, { new: true });
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
    }
  }
};