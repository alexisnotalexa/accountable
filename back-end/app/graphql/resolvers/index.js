const User = require('../../models/user');

const getAllUsers = async () => {
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

const getUser = async ({ id }) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (params) => {
  try {
    const { email, password } = params.user;
    console.log('email', email);
    console.log('password', password);
  } catch (error) {
    throw error;
  }
};

const signup = async (params) => {
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
  getAllUsers,
  getUser,
  login,
  signup
};