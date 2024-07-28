import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../Features/AuthSlice";
import authservice from "../Appwrite/Auth";
import Button from "./Button";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "./Logo";

export function Register_page() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      const userData = await authservice.Register(data);
      if (userData) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(authlogin(userData));
        navigate("/");
        console.log("User created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-start justify-center p-96">
      <div
        className={`mx-auto w-full max-w-2xl bg-gray-100 rounded-xl p-10 border border-black/10 h-auto`}
      >
        <div className="mb-2 flex justify-center h-full">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
