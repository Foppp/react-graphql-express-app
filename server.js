const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const { DB_URI, DB_NAME, SECRET_KEY } = process.env;

const PORT = process.env.port || 5000;

const getToken = (user) =>
  jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

const getUserFromToken = async (token, db) => {
  if (!token) {
    return null;
  }

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

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const user = await getUserFromToken(req.headers.authorization, db);
      return { user, db };
      // try {
      //   const user = await getUserFromToken(req.headers.authorization, db);
      // return { user, db };
      // } catch (e) {
      //   console.log(e)
      // }
    },
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  app.use(express.static(`${__dirname}/client/public`));
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
};

start();
