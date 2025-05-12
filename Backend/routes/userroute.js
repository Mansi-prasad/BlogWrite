import express from "express";
import {
  loginUser,
  registerUser,
  verify,
} from "../controllers/usercontroller.js";
import verifyToken from "../middleware/verifytoken.js";
const userRouter = express.Router();
userRouter.get("/verify", verifyToken, verify);
userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
export default userRouter;
