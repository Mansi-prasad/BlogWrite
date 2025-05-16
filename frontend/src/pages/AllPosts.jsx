import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
const AllPosts = ({ url }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { token } = useOutletContext();
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${url}/api/post/my-posts`, {
        //Sends the JWT token with the request, allowing access to protected routes.
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setPosts(res.data.postData);
        if (res.data.postData.length === 0) {
          toast.info(res.data.message); // "No posts found"
        }
      } else {
        toast.error("Error! to load the post");
      }
    } catch (error) {
      console.log("Error to fetch posts: ", error);
      const errorMessage = error.response?.data?.message || "Error occurred!";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPosts();
  }, [token]);
  if (posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => {
              return (
                <div key={post._id} className="p-2 w-1/4">
                  <PostCard {...post} url={url} />
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8">
        <Container>
          <p className="text-2xl font-semibold p-4">You have no posts</p>
        </Container>
      </div>
    );
  }
};

export default AllPosts;
