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
    },
    getAllTasksForUser: async (_, { userId }) => {
      try {
        // should also include completed/completedAt
        let taskIds = await UserTask.find({ userId });
        taskIds = taskIds.map(task => task.taskId);
        const tasks = await Task.find({ _id: { $in: taskIds }});
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

        let newUserTasks = await GroupMember.find({ groupId });
        newUserTasks = newUserTasks.map(member => ({ taskId: task.id, userId: member.id }));
        await UserTask.create(newUserTasks);

        return task;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTask: async (_, { description, taskId }) => {
      try {
        return await Task.findByIdAndUpdate(taskId, { description }, { new: true });
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTaskGroup: async (_, { taskId, groupId }) => {
      try {
        const group = await Group.findById(groupId);
        if (!group) throw new Error('This group does not exist.');

        // TODO: Debug here
        // Delete old UserTasks
        await UserTask.deleteMany({ taskId });

        // Create new UserTasks
        let newUserTasks = await GroupMember.find({ groupId });
        newUserTasks = newUserTasks.map(member => ({ taskId, userId: member.id }));
        await UserTask.create(newUserTasks);

        return await Task.findByIdAndUpdate(taskId, { groupId }, { new: true });
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