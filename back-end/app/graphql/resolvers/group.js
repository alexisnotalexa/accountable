const Group = require('../../models/group');

module.exports = {
  Query: {
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
    }
  },
  Mutation: {
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
    updateGroup: async (_, args) => {
      try {
        const { id, name } = args;
        return await Group.findByIdAndUpdate(id, { name });
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteGroup: async (_, { id }) => {
      try {
        const result = await Group.findByIdAndDelete(id);
        console.log(result);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};