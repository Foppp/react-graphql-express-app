const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const users = [
  { id: 1, username: 'Michel', userlastname: 'Jackson', age: 34 },
  { id: 2, username: 'David', userlastname: 'Clipper', age: 23 },
  { id: 3, username: 'Jason', userlastname: 'PORN', age: 65 },
];

const PORT = process.env.port || 5000;
const app = express();

app.use(cors());
app.use(express.static(`${__dirname}/client/public`));

const root = {
  getUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id === id);
  },
  createUser: ({ input }) => {
    const newUser = { id: users.length + 1, ...input };
    users.push(newUser);
    return newUser;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
