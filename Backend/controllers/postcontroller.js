import mongoose from "mongoose";
import postModel from "../models/postmodel.js";
import fs from "fs";
//add post
const createPost = async (req, res) => {
  // console.log("File:", req.file);
  // console.log("Body:", req.body);
  // console.log("user: ", req.user);
  if (!req.file) {
    // console.error("Multer did not process the file upload.");
    return res
      .status(400)
      .json({ success: false, message: "File upload failed" });
  }
  let image_filename = `${req.file.filename}`;

  const post = new postModel({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
    status: req.body.status,
    postImage: image_filename,
    // req.user set by authentication middleware
    // retrieves the user ID from the token
    user: req.user.id,
  });
  console.log("User info:", req.user); // decoded token payload(data)
  try {
    await post.save();
    return res
      .status(200)
      .json({ success: true, message: "Post Added Successfully!" });
  } catch (err) {
    console.error("Error while saving post:", err);
    return res
      .status(500)
      .json({ success: false, message: "ERROR! Failed to create post" });
  }
};

// List all post
const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    // console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Error! to get the posts" });
  }
};
// remove the post from DB
const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }
    //delete the post image
    fs.unlink(`uploads/${post.postImage}`, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Error! to delete post image." });
      }
    });
    //delete the post data
    await postModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "Post Removed from the DB" });
    // } else {
    //   return res
    //     .status(500)
    //     .json({ success: false, message: "Error! to delete post!" });
    // }
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Server Error!" });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    // Validate if ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Post ID" });
    }
    const { title, content, slug, status, user } = req.body;
    let PostData = { title, content, slug, status, user };

    if (req.file) {
      PostData.postImage = `${req.file.filename}`;
    }

    const updatedPost = await postModel.findByIdAndUpdate(id, PostData, {
      new: true,
    });
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Error! to update post" });
    }
    res.json({
      success: true,
      post: updatedPost,
      message: "Post updated successfull!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
// get users controller
const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch posts created by the logged-in user
    const posts = await postModel.find({ user: userId });
    res.status(200).json({ success: true, postData: posts });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching user's posts" });
  }
};
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.json({ success: true, post: post });
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export { createPost, updatePost, deletePost, getPosts, getUserPosts, getPost };
