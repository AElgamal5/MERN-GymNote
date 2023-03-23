const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1d",
  });
};

/*
    @path: /login
    @method: post
    @file: routes/user
*/
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(201).json({ _id: user._id, email: user.email, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/*
    @path: /signup
    @method: post
    @file: routes/user
*/
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(201).json({ _id: user._id, email: user.email, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { signup, login };
