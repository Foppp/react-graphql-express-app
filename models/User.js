const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  userlastname: String,
  age: Number,
});

module.exports = model('User', userSchema);