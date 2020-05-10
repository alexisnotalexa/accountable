const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const createToken = async (user, secret, expiresIn) => {
  const { id, email } = user;
  console.log(user);
  return await jwt.sign({ id, email }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users.map(user => {
          return {
            ...user._doc,
            _id: user.id,
            createdAt: new Date(user._doc.createdAt).toISOString(),
            updatedAt: new Date(user._doc.updatedAt).toISOString()
          }
        });
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
    login: async (_, args) => {
      try {
        const { email, password } = args.user;
        console.log('email', email);
        console.log('password', password);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    signup: async (_, args, { secret }) => {
      try {
        const { firstName, lastName, email, password } = args.user;
        const user = await User.create({
          firstName,
          lastName,
          email,
          password
        });
        console.log('signup');
        return { token: createToken(user, secret, '1m') };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};