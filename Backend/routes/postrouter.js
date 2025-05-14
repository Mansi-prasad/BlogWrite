import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getUserPosts,
  getPost,
} from "../controllers/postcontroller.js";
import verifyToken from "../middleware/verifytoken.js";
import multer from "multer";
const postRouter = express.Router();
//save image in to the upload folder
//image Storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  // return a callback that rename the file(stored in uploads folder)
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
//storage configuration
const upload = multer({ storage: storage });
//upload post image
postRouter.post("/create", verifyToken, upload.single("postImage"), createPost);

postRouter.get("/posts", verifyToken, getPosts);
postRouter.get("/my-posts", verifyToken, getUserPosts);
postRouter.get("/posts/:id", verifyToken, getPost);
postRouter.delete("/delete/:id", verifyToken, deletePost);

postRouter.put(
  "/update/:id",
  verifyToken,
  upload.single("postImage"),
  updatePost
);

export default postRouter;
