const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server')
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const { DB_URI, DB_NAME, SECRET_KEY } = process.env;

const PORT = process.env.port || 5000;

const getToken = (user) => jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

const getUserFromToken = async (token, db) => {
  if (!token) { return null }

  const tokenData = jwt.verify(token, SECRET_KEY);
  if (!tokenData?.id) {
    return null;
  }
  return await db.collection('users').findOne({ _id: ObjectID(tokenData.id) });
};

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    displayName: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type AuthUser {
    userId: ID!
    token: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthUser!
  }

  type Query {
    getUsers: [User!]!
  }
`;

const resolvers = {
  Mutation: {
    login: async (_, { username, password }, { db }) => {
      const user = await db.collection('users').findOne({ username });
      const isPasswordCorrect = password === user.password;
      if (!user || !isPasswordCorrect) {
        throw new Error('Invalid user or password!')
      }
      return { userId: user._id, token: getToken(user) };
    },
  },
  Query: {
    getUsers: async (_, __, { db, user }) => {
      if (!user) { throw new Error('Authentication Error. Please sign in'); }
      return await db.collection('users').find().toArray();
    }
  }
}

const start = async () => {
  const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      console.log('req.headers.auth -> ', req.headers.authorization)
      const user = await getUserFromToken(req.headers.authorization, db);
      console.log('context apolloserver user -> ', user)
      return { user, db }
    },
  });
  await server.start()
  const app = express();
  server.applyMiddleware({ app });
  app.use(express.static(`${__dirname}/client/public`));
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
  // try {
  //   await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  //   console.log("Connected successfully");
  //   const server = new ApolloServer({
  //     typeDefs,
  //     resolvers,
  //   });
  //   await server.start();
  //   const app = express();
  //   server.applyMiddleware({ app });
  //   app.use(express.static(`${__dirname}/client/public`));
  //   // app.use(cors());
  //   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  // } catch (e) {
  //   console.log(`Connection Error: ${e}`)
  // }
}

start();