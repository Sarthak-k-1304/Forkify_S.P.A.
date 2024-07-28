import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../Features/AuthSlice";
import authservice from "../Appwrite/Auth";
import Button from "./Button";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import { setUserId, setBookmarks } from "../Features/RecipieSlice";
import Dbservice from "../Appwrite/DB";

export function Login_page() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  React.useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userData = await authservice.getCurrentUser();
    if (userData) {
      dispatch(authlogin(userData));
      console.log("User logged in");

      const arr = await Dbservice.getBookmarksByUserId(userData.$id);
      dispatch(setBookmarks(arr));
    }
    navigate("/");
  };

  const login = async (data) => {
    try {
      const session = await authservice.Login(data);
      if (session) {
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex  items-start justify-center w-full min-h-screen p-96">
      <div
        className={`mx-auto w-full max-w-2xl bg-gray-100 rounded-xl p-10 border border-black/10 h-auto`}
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
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
