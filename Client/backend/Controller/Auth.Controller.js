const bcrypt = require("bcryptjs");
const { User } = require("../Model/Auth.model");
const { generatetoken } = require("../Common/Generatetoken");

const signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const isusername = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (isusername) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    if (newUser) {
      generatetoken(newUser._id, res);
      const response = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };
      return res
        .status(200)
        .json({ response, message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ error: "All fields not provided" });
    }
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(404).json({ error: "user not found" });
    }
    const ispasswordtrue = await bcrypt.compare(password, finduser.password);
    if (!ispasswordtrue) {
      return res.status(400).json({ error: "password is incorrect" });
    }
    generatetoken(finduser._id, res);
    res.status(200).json({
      _id: finduser._id,
      username: finduser.username,
      email: finduser.email,
      role: finduser.role,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, login, logout };
