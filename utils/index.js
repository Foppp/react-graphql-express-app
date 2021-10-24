const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ObjectID } = require('mongodb');

dotenv.config();

const { SECRET_KEY } = process.env;

const getToken = (user) => jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30 days' });

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

module.exports = { getToken, getUserFromToken }