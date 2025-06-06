import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Btn, Input, Logo } from "../components/index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const Login = ({ url }) => {
  const navigate = useNavigate();
  const { setToken, setUser, user } = useOutletContext();
  const { register, handleSubmit } = useForm(); // handleSubmit (is an event) accept user defined function as an argument to handle form submit

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(url + "/api/user/login", data);
      if (res.data.success) {
        const token = res.data.token;
        setToken(token);
        setUser(res.data.user); // currently logged-in user's data
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };
  return (
    <div className="py-8">
      <div className=" flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 `}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account? &nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign up
            </Link>
          </p>
          <form action="" onSubmit={handleSubmit(handleLogin)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email: "
                type="email"
                name="email"
                placeholder="Enter email"
                //syntax for react-hook-form register for handle input.
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (val) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        val
                      ) || "Email must be valid",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                })}
              />
              <Btn type="submit" className="w-full">
                Sign in
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
