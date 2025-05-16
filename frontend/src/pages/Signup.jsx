import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Btn, Input, Logo } from "../components/index.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
const Signup = ({ url }) => {
  const navigate = useNavigate();
  const { setToken } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleSignup = async (data) => {
    try {
      const res = await axios.post(`${url}/api/user/signup`, data);
      if (res.data.success) {
        const token = res.data.token;
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    }
  };
  return (
    <div className="py-8">
      <div className="flex items-center justify-center">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Already have any account? &nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
          {/* {["name", "email", "password"].map((field) =>
            errors[field] ? (
              <p key={field} className="text-red-500 text-sm py-2">
                {errors[field].message}
              </p>
            ) : null
          )} */}

          <form onSubmit={handleSubmit(handleSignup)}>
            <div className="space-y-5">
              <Input
                label="Full Name: "
                type="text"
                name="fullname"
                placeholder="Enter full name"
                {...register("name", { required: "Full name is required" })}
              />
              {/* {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )} */}
              <Input
                label="Email: "
                type="email"
                name="email"
                placeholder="Enter your email"
                //syntax for react-hook-form register for handle input.
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (val) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        val
                      ) || "Email must be valid",
                  },
                })}
              />
              {/* {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )} */}
              <Input
                label="Password: "
                type="password"
                name="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  validate: {
                    matchPattern: (value) =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
                        value
                      ) ||
                      "Password must be at least 8 characters long and must contains one uppercase character, lowercase character, digit and special character.",
                  },
                })}
              />
              {/* {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )} */}
              <Btn type="submit" className="w-full">
                Sign up
              </Btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
