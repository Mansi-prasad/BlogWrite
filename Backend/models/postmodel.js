import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    postImage: { type: String, required: true },
  },
  { timestamps: true } // automatic createdAt and updatedAt fields
);
const postModel = mongoose.models.post || mongoose.model("post", postSchema);
export default postModel;
