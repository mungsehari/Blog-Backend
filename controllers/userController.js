import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send({
      usersCount: users.length,
      success: true,
      message: "All users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error getting users",
      success: false,
      error,
    });
  }
};
export const userRigister = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
      return res.status(400).send({
        message: "All fields are required",
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    return res.status(201).send({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error registering user",
      success: false,
      error,
    });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        message: "All fields are required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "User not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid credentials",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error logging in user",
      success: false,
      error,
    });
  }
};
