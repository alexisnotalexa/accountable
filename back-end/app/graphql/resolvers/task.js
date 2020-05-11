const Group = require('../../models/group');
const GroupMember = require('../../models/groupMember');
const Task = require('../../models/task');
const UserTask = require('../../models/userTask');

module.exports = {
  Query: {
    getAllTasksForGroup: async (_, { groupId }) => {
      try {
        // should also include completed/completedAt
        const tasks = await Task.find({ groupId });
        return tasks.map(task => ({
          ...task._doc,
          _id: task.id,
          createdAt: new Date(task.createdAt).toISOString(),
          updatedAt: new Date(task.updatedAt).toISOString()
        }));
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    createTask: async (_, args) => {
      try {
        const { description, groupId } = args.task;
        const group = await Group.findById(groupId);
        if (!group) throw new Error("You can't add a new task to a group that doesn't exist!");

        const task = await Task.create({
          description,
          groupId
        });

        const userIds = await GroupMember.find({ groupId });
        const newUserTasks = userIds.map(member => ({ taskId: task.id, userId: member.id }));
        await UserTask.create(newUserTasks);

        return task;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTask: async (_, args) => {
      try {

      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTask: async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        if (!task) throw new Error('This task does not exist.');

        const userTasks = await UserTask.deleteMany({ taskId: task.id });
        const result = await Task.deleteOne({ _id: task.id });
        return userTasks.deletedCount && result.deletedCount;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};