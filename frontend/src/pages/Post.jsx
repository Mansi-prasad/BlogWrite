import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Btn, Container } from "../components/index";
import parse from "html-react-parser";
import axios from "axios";
import { toast } from "react-toastify";
const Post = ({ url }) => {
  const [post, setPost] = useState(null);
  const { _id } = useParams();
  const navigate = useNavigate();
  const { token, setToken, user } = useOutletContext();
  const fetchPost = async () => {
    try {
      const res = await axios.get(`${url}/api/post/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setPost(res.data.post);
      } else {
        toast.error("Error! to load the post");
        navigate("/");
      }
    } catch (error) {
      console.log("Error to fetch posts: ", error);
      toast.error("Server error! please try again");
      navigate("/");
    }
  };
  useEffect(() => {
    if (_id) {
      // fetchUser();
      fetchPost();
    } else {
      navigate("/");
    }
  }, [_id, navigate, url, navigate, setToken]);

  const deletePost = () => {
    // need to change
    const deletePost = async () => {
      try {
        await axios.delete(`${url}/api/post/delete/${post._id}`, {
          headers: { Authorization: ` ${token}` },
        });
        navigate("/");
      } catch (err) {
        console.error("Failed to delete post", err);
      }
    };
  };
  console.log("post: ", post);
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={`${url}/images/${post.postImage}`}
            alt={post.title}
            className="rounded-xl"
          />
          {user && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Btn className="mr-3" bgColor="bg-green-500">
                  Edit
                </Btn>
              </Link>
              <Btn bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Btn>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title} </h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
