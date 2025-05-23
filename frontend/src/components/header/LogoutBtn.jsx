import React from "react";
import { useNavigate } from "react-router-dom";
const LogoutBtn = ({ setToken, setUser }) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="inline-block px-6 py-2 duration-200 hover: bg-blue-100 rounded-full"
        onClick={() => {
          setToken("");
          setUser("");
          navigate("/");
        }}
      >
        Logout
      </button>
    </>
  );
};
export default LogoutBtn;
