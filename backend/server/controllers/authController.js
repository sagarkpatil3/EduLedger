const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../../utils/hashUtils");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await hashPassword(password);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
