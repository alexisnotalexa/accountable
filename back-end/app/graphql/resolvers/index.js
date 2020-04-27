const User = require('../../models/user');

const users = async () => {
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
    throw error;
  }
};

const createUser = async (params) => {
  try {
    const { firstName, lastName, email, password } = params.user;
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });
    const newUser = await user.save();
    return { ...newUser._doc, _id: newUser.id };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  users,
  createUser
};