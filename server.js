const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const PORT = process.env.port || 5000
const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/public`));


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

