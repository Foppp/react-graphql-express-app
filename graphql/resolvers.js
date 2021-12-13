const { getToken } = require('../utils/index')

const resolvers = {
  Mutation: {
    login: async (_, { username, password }, { db }) => {
      const user = await db.collection('users').findOne({ username });
      const isPasswordCorrect = password === user?.password;
      if (!user) throw new Error('Username does not exist!');
      if (!isPasswordCorrect) throw new Error('Password is incorrect!');
      return { userId: user._id, token: getToken(user) };
    },
  },
  Query: {
    getUsers: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('users').find().toArray();
    },
    getArtists: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('artists').find().toArray();
    },
  },
};

module.exports = resolvers;