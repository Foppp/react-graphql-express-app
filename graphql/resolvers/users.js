// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// const bcrypt = require('bcryptjs');
const User = require('../../models/User');
// const { SECRET_KEY } = process.env

// const generateToken = (user) => jwt.sign({
//   id: user.id, email: user.email, username: user.username,
// }, SECRET_KEY, { expiresIn: '1h' });

const resolvers = {
  Mutation: {
    // login: async (parent, { input: { username, password } }) => {
    //   console.log(username)
      // try {
      //   const user = await User.findOne({ username });
      //   if (!user) {
      //     throw new Error('User not found!');
      //   }
      //   // const match = await bcrypt.compare(password, user.password);
      //   if (password !== user.password) {
      //     throw new Error('Wrong password');
      //   }
  
      //   const token = generateToken(user);
      //   return user;
      // } catch (e) {
      //   throw new Error('in resolver login');
      // }
    // },
  },
  Query: {
    getUsers: async () => {
      const users = await User.find();
      return users;
    }
  }
}
// const resolvers = {
//   login: async (_, { input: { username, password } }) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) {
//         throw new Error('User not found!');
//       }
//       // const match = await bcrypt.compare(password, user.password);
//       if (password !== user.password) {
//         throw new Error('Wrong password');
//       }

//       const token = generateToken(user);
//       return { user, token };
//     } catch (e) {
//       throw new Error('in resolver login');
//     }
//   },
// };

module.exports = resolvers;