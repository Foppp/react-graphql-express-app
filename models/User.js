const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  displayName: String,
});

module.exports = model('User', userSchema);

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       select: false,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid email",
//       ],
//     },
//     displayName: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// )

// module.exports = mongoose.model("user", userSchema)