import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifytoken.js";
const verify = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

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
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: "ERROR!" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
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
  // const emailTri = email.trim();
  if (!emailRegex.test(email)) {
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

export { loginUser, createToken, registerUser, verify };
