// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const mongoose = require('mongoose');
// const cors = require('cors');
const { ApolloServer } = require('apollo-server');
const { MongoClient, ObjectID } = require('mongodb');

const dotenv = require('dotenv');

const { DB_URI, DB_NAME } = process.env;

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const { authenticate } = require("./middleware/auth")

dotenv.config();

const PORT = process.env.port || 5000;
// app.use(authenticate);

// app.use('/graphql', graphqlHTTP({ schema, graphiql: true, rootValue: root }));


const start = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await server.start();
    const app = express();
    server.applyMiddleware({ app });
    app.use(express.static(`${__dirname}/client/public`));
    // app.use(cors());
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(`Connection Error: ${e}`)
  }
}

start();