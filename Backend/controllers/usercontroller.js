import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });
    }
    //password matching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password." });
    }
    // const token=jwt.sign({_id:userModel._id},process.env.JWT_SECRET,{expiresIn:"1h"});
    const token = createToken(user._id);
    const { _id, name } = user;
    res.status(200).json({ success: true, token, user: { _id, name } });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false, message: "ERROR!" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

//Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password);
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "Email already exists! Please use a different email.",
    });
  }
  // Validating User's email and password.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format!",
    });
  }
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and contain at least one special character.",
    });
  }
  try {
    // hashing the user password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    //take the user id and generate one token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

export { loginUser, createToken, registerUser };
