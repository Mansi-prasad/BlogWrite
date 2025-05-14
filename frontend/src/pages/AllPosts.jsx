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
      } else {
        toast.error("Error! to load the post");
      }
    } catch (error) {
      console.log("Error to fetch posts: ", error);
      toast.error("Server error! please try again");
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPosts();
  }, [token]);
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
};

export default AllPosts;
