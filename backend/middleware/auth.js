const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "authorization token is required!" });
  }
  // authorization= "Bearer dfhsufsdfhs......"
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(_id).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Not an auth req" });
  }
};

module.exports = auth;
