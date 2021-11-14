const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');
const { getUserFromToken } = require('./utils/index');

dotenv.config();

const { DB_URI, DB_NAME } = process.env;

const PORT = process.env.port || 5000;

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
    },
  });
  
  await server.start();

  const app = express();
  app.use(cors());
  server.applyMiddleware({ app });

  app.use(express.static(`${__dirname}/client/public`));
  app.get('*', (req, res) => res.sendFile(`${__dirname}/client/public/index.html`));

  app.listen(PORT, () => console.log(`Server running at ${PORT}`));
};

start();
