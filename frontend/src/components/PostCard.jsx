import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ _id, postImage, title }) => {
  return (
    <>
      <Link to={`/post/${_id}`}>
        <div className="w-full bg-gray-100 rounded-xl p-4 h-76">
          <div className="w-full justify-center mb-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/${postImage}`}
              alt={title}
              className="rounded-xl w-full h-48"
            />
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </Link>
    </>
  );
};
export default PostCard;
