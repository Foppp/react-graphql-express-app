const { getToken } = require('../utils/index')

const resolvers = {
  Mutation: {
    login: async (_, { username, password }, { db }) => {
        const user = await db.collection('users').findOne({ username });
        const isPasswordCorrect = password === user?.password;
        if (!user || !isPasswordCorrect) throw new Error('Username or Password are incorrect!');
        return { userId: user._id, token: getToken(user) };
    },
  },
  Query: {
    getUsers: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('users').find().toArray();
    },
  },
};

module.exports = resolvers;