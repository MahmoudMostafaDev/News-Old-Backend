const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
  saved: {
    type: [String],
  },
});

module.exports = Mongoose.model("NewsUser", UserSchema);
