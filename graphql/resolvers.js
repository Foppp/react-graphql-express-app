const { ObjectID } = require('mongodb');

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
    createArtist: async (_, { artist }, { db }) => {
      const response = await db.collection('artists').insertOne(artist);
      return { success: response.acknowledged };
    },
    removeArtist: async (_, { userId }, { db }) => {
      const response = await db.collection('artists').deleteOne({ _id: ObjectID(userId) });
      return { success: response.acknowledged };
    },
    editArtist: async (_, { userId, artist }, { db }) => {
      const response = await db.collection('artists').replaceOne({ _id: ObjectID(userId) }, artist);
      return { success: response.acknowledged };
    },
    createShow: async (_, { show }, { db }) => {
      const response = await db.collection('shows').insertOne(show);
      return { success: response.acknowledged };
    },
    removeShow: async (_, { showId }, { db }) => {
      const response = await db.collection('shows').deleteOne({ _id: ObjectID(showId) });
      return { success: response.acknowledged };
    },
    editShow: async (_, { showId, show }, { db }) => {
      const response = await db.collection('shows').replaceOne({ _id: ObjectID(showId) }, show);
      return { success: response.acknowledged };
    },
    createCustomer: async (_, { customer }, { db }) => {
      const response = await db.collection('customers').insertOne(customer);
      return { success: response.acknowledged };
    },
    removeCustomer: async (_, { customerId }, { db }) => {
      const response = await db.collection('customers').deleteOne({ _id: ObjectID(customerId) });
      return { success: response.acknowledged };
    },
    editCustomer: async (_, { customerId, customer }, { db }) => {
      const response = await db.collection('customers').replaceOne({ _id: ObjectID(customerId) }, customer);
      return { success: response.acknowledged };
    },
  },
  Query: {
    getUsers: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('users').find().toArray();
    },
    getUser: async (_, { userId }, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('users').findOne({ _id: ObjectID(userId) });
    },
    getArtists: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('artists').find().toArray();
    },
    getArtist: async (_, { userId }, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      const artist = await db.collection('artists').findOne({ _id: ObjectID(userId) });
      return artist;
    },
    getShows: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('shows').find().toArray();
    },
    getShow: async (_, { showId }, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      const show = await db.collection('shows').findOne({ _id: ObjectID(showId) });
      return show;
    },
    getCustomers: async (_, __, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      return await db.collection('customers').find().toArray();
    },
    getCustomer: async (_, { customerId }, { db, user }) => {
      if (!user) throw new Error('Authentication Error. Please sign in');
      const customer = await db.collection('customers').findOne({ _id: ObjectID(customerId) });
      return customer;
    },
  },
};

module.exports = resolvers;