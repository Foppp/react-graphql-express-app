const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');

dotenv.config();

const { DB_URI } = process.env;
const PORT = process.env.port || 5000;

const app = express();
app.use(cors());
app.use(express.static(`${__dirname}/client/public`));

app.use('/graphql', graphqlHTTP({ schema, graphiql: true, rootValue: root }));

const start = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (e) {
    console.log(`Connection Error: ${e}`)
  }
}

start();