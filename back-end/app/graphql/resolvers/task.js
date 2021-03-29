const Group = require('../../models/group');
const Task = require('../../models/task');
const User = require('../../models/user');
const task = require('../schemas/task');

module.exports = {
  Query: {
    // TODO: Need to add authentication
    getAllTasks: async () => {
      try {
        return await Task.find();
      } catch (error) {
        throw new Error(error);
      }
    },
    getTask: async (_, { id }) => {
      try {
        return await Task.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    // TODO: Need to add authentication
    createTask: async (_, args) => {
      try {
        const { description, groupId, userId } = args.task;
        const user = await User.findById(userId);
        if (!user) throw new Error('No user found.');

        const group = await Group.findById(groupId);
        if (!group) throw new Error("You can't add a new task to a group that doesn't exist!");

        const task = await Task.create({
          description,
          group,
          createdBy: user
        });

        user.tasks = [...user.tasks, task._id];
        await user.save();

        group.tasks = [...group.tasks, task._id];
        await group.save();

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
    // updateTaskGroup: async (_, { taskId, groupId }) => {
    //   try {
    //     const group = await Group.findById(groupId);
    //     if (!group) throw new Error('This group does not exist.');

    //     // TODO: Debug here
    //     // Delete old UserTasks
    //     await UserTask.deleteMany({ taskId });

    //     // Create new UserTasks
    //     let newUserTasks = await GroupMember.find({ groupId });
    //     newUserTasks = newUserTasks.map(member => ({ taskId, userId: member.id }));
    //     await UserTask.create(newUserTasks);

    //     return await Task.findByIdAndUpdate(taskId, { groupId }, { new: true });
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // },
    // deleteTask: async (_, { id }) => {
    //   try {
    //     const task = await Task.findById(id);
    //     if (!task) throw new Error('This task does not exist.');

    //     const userTasks = await UserTask.deleteMany({ taskId: task.id });
    //     const result = await Task.deleteOne({ _id: task.id });

    //     return userTasks.deletedCount && result.deletedCount;
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // }
  },
  Task: {
    group: async ({ id }) => {
      try {
        return await Group.findOne({ tasks: id });
      } catch (error) {
        throw new Error(error);
      }
    },
    createdBy: async ({ id }) => {
      try {
        return await User.findOne({ tasks: id });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};