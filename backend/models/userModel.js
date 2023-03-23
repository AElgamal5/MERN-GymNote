const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Not valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is weak");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("this email is already used");
  }

  //hashing
  const salt = await bcrypt.genSalt(10);

  const hashedPass = await bcrypt.hash(password, salt);

  //saving
  const user = await this.create({ email, password: hashedPass });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields are required");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Wrong email");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("Wrong password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
