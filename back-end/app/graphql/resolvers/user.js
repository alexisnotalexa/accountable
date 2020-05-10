const { combineResolvers } = require('graphql-resolvers');
const { isAdmin } = require('./authorization');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const { id, email, role } = user;
  return jwt.sign({ id, email, role }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users.map(user => ({
          ...user._doc,
          _id: user.id,
          createdAt: new Date(user.createdAt).toISOString(),
          updatedAt: new Date(user.updatedAt).toISOString()
        }));
      } catch (error) {
        throw new Error(error);
      }
    },
    getUser: async (_, { id }) => {
      try {
        const user = await User.findOne({ _id: id });
        return user;
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
          return result.deletedCount === 1 ? true : false;
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

        return { token: createToken(user, secret, '5m') };
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
        return { token: createToken(user, secret, '5m') };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};