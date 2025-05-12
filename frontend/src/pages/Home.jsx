import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components/index";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Home = ({ url }) => {
  const [posts, setPosts] = useState([]);
  const { token } = useOutletContext();
  const fetchPosts = async () => {
    if (!token) {
      return;
    } else {
      try {
        console.log("Token:", token);
        const res = await axios.get(`${url}/api/post/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setPosts(res.data.data);
        } else {
          toast.error("Error! to load the post");
        }
      } catch (error) {
        console.log("Error to fetch posts: ", error);
        toast.error("Server error! please try again");
      }
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [token]);
  if (!token) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post, index) => (
            <div className="p-2 w-1/4" key={index}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
