import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Login,
  Signup,
  AllPosts,
  EditPost,
  AddPost,
  Home,
  Post,
} from "./components/index.js";
const url = `${import.meta.env.VITE_BACKEND_URL}`;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App url={url} />,
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/login",
        element: <Login url={url} />,
      },
      {
        path: "/signup",
        element: <Signup url={url} />,
      },
      {
        path: "/all-posts",
        element: <AllPosts url={url} />,
      },
      {
        path: "/add-post",
        element: <AddPost url={url} />,
      },
      {
        path: "/edit-post/:slug",
        element: <EditPost url={url} />,
      },
      {
        path: "/post/:id",
        element: <Post url={url} />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
