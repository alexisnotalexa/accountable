const { combineResolvers } = require('graphql-resolvers');
const { isAdmin, isAuthenticated } = require('./authorization');
const User = require('../../models/user');
const Group = require('../../models/group');
const Task = require('../../models/task');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { id, email, role } = user;
  return jwt.sign({ id, email, role }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    // TODO: Need to add authentication
    getAllUsers: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error(error);
      }
    },
    getUser: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    deleteUser: combineResolvers(
      isAdmin,
      async (_, { id }) => {
        try {
          const result = await User.deleteOne({ _id: id });
          return result.deletedCount === 1;
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
    login: async (_, args, { secret }) => {
      try {
        const { email, password } = args.user;
        const user = await User.findOne({ email });
        if (!user) throw new Error('No user found with this email address.');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) throw new Error('Invalid password.');

        return { token: createToken(user, secret, '30m') };
      } catch (error) {
        throw new Error(error);
      }
    },
    signup: async (_, args, { secret }) => {
      try {
        const { firstName, lastName, email, password, role } = args.user;
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
          role
        });
        return { token: createToken(user, secret, '30m') };
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: combineResolvers(
      isAuthenticated,
      async (_, args, { authUser }) => {
        try {
          const { userId, firstName, lastName, email, password } = args.user;
          const user = await User.findById(userId);
          if (!user) throw new Error('No user found.');
          if (user.id.toString() !== authUser.id.toString()) {
            throw new Error('You can only make user updates to your own account.');
          }
  
          if (firstName) user.firstName = firstName;
          if (lastName) user.lastName = lastName;
          if (email) user.email = email;
          if (password) user.password = password;
          await user.save();
  
          return user;
        } catch (error) {
          throw new Error(error);
        }
      }
    )
  },
  User: {
    groups: async ({ groups }) => {
      try {
        return await Group.find({ '_id': { $in: groups }});
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