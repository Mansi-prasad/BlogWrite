import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const EditPost = ({ url }) => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { token } = useOutletContext();
  // console.log("id:", id);
  // console.log("useParams:", useParams());
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${url}/api/post/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        // if res.data is true then fetch post from it.
        if (res.data?.post) {
          setPost(res.data.post);
        } else {
          navigate("/");
          toast.error("Error! to load post");
        }
      }
    } catch (err) {
      console.error("Failed to load post: ", err);
      toast.error("Server error! please try again");
      navigate("/");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!id || !token) {
      toast.error("Unauthorized access");
      navigate("/");
      return;
    }
    fetchPost();
  }, [id, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} url={url} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
