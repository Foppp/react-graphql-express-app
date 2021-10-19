const User = require('../models/User');

const root = {
  getUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (e) {
      throw new Error(e)
    }
  },
  getUser: async ({ id }) => {
    const user = await User.findById(id);
    return user;
  },
  createUser: async ({ input }) => {
    const { username, userlastname, age } = input;
    const newUser = new User({
      username,
      userlastname,
      age,
    });
    try {
      const user = await newUser.save();
      return user;
    } catch (e) {
      throw new Error(e)
    }
  },
};

module.exports = root;