const User = require('../../models/user');

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
    }
  },
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        console.log('email', email);
        console.log('password', password);
      } catch (error) {
        throw new Error(error);
      }
    },
    signup: async (_, args) => {
      try {
        const { firstName, lastName, email, password } = args.user;
        const user = new User({
          firstName,
          lastName,
          email,
          password
        });
        const newUser = await user.save();
        return { ...newUser._doc, _id: newUser.id };
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};