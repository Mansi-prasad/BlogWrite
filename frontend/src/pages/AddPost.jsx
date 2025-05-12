import React from "react";
import { Container, PostForm } from "../components/index";
const AddPost = ({ url }) => {
  return (
    <div className="py-8">
      <Container>
        <PostForm url={url}/>
      
      </Container>
    </div>
  );
};

export default AddPost;
