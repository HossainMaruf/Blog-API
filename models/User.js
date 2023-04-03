const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {USER_SECRET} = require('../config');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 3,
      max: 30,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
    },
    city: {
      type: String,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    tokens: [
      {token: {
      type: String,
      required: true
    }}]
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({email: user.email, password: user.password}, USER_SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
}

module.exports = mongoose.model("User", userSchema);
