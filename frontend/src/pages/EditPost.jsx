import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const EditPost = () => {
  const [post, setPost] = useState(null);
  const { _id } = useParams();
  const navigate = useNavigate();
  useEffect(async () => {
  
    try {
      const fetchPost = async () => {
        const res = await axios.get(`${url}/api/post/getpost`);
        if (res.data.success) {
          if (res.data?.post) {
            setPost(res.data.post);
          } else {
            navigate("/");
            toast.error("Error! to load post");
          }
        }
      };
    } catch (error) {
      console.error("Failed to load post", err);
      toast.error("Server error! please try again");
      navigate("/");
    }
    if (_id) {
      fetchPost();
    } else {
      navigate("/");
      toast.error("Error! to load post");
    }
  }, [_id, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
