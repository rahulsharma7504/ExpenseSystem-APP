const UserData = require('../Model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const findUser = await UserData.findOne({ email });
    if (findUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new UserData({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log("User registered:", savedUser);
    return res.status(201).json({ msg: "User registered", user: savedUser });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserData.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Log success message (optional)
    console.log("User logged in:", user);

    // Return token and user details
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  LoginUser,
  RegisterUser
};
