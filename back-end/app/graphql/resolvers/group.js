const Group = require('../../models/group');
const GroupMember = require('../../models/groupMember');

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
    getGroupsByUserId: async (_, { userId }) => {
      try {
        let groupIds = await GroupMember.find({ userId });
        groupIds = groupIds.map(group => group.groupId);
        const groups = await Group.find({ _id: { $in: groupIds } });
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
    addGroupMember: async (_, { groupId, userId }) => {
      try {
        const groupMember = await GroupMember.findOne({ groupId, userId });
        if (groupMember) throw new Error('User already exists in this group.');

        await GroupMember.create({
          groupId,
          userId
        });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    createGroup: async (_, args) => {
      try {
        const { name, createdBy } = args.group;
        const group = await Group.create({
          name,
          createdBy
        });
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
    updateGroup: async (_, { id, name }) => {
      try {
         return await Group.findByIdAndUpdate(id, { name }, { new: true });
      } catch (error) {
        throw new Error(error);
      }
    },
  }
};