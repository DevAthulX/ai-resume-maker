const userModel = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserExist) {
    return res
      .status(400)
      .json({ message: "Account with same username or email already exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const User = await userModel.create({
    email,
    password: hash,
    username,
  });
  const token = jwt.sign(
    { id: User._id, username: User.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: User._id,
      email: User.email,
      username: User.username,
    },
  });
}
/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,   // ❌ User → user
      email: user.email,
      username: user.username,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
};