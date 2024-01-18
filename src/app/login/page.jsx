"use client";
import React, { useState } from "react";
import "./style.css";
import Link from "next/link";
import Button from "../Components/btn/page";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    formState,
  } = useForm();

  const router = useRouter();
  const getUsers = JSON.parse(localStorage.getItem("users"));

  const handleSubmitData = (data) => {
    if (
      getUsers &&
      getUsers.find(
        (u) => u.email === data.email && u.password === data?.password
      )
    ) {
      const existingUser = getUsers.find(
        (u) => u.email === data.email && u.password === data?.password
      );
      localStorage.setItem("Me", JSON.stringify(existingUser));
      router.push("/");
      router.refresh();
    } else {
      alert("Email or Password is incorrect.");
    }
  };

  return (
    <>
      <div className="userContainer">
        <h1>Welcome Back!</h1>
        <form
          className="loginform"
          onSubmit={handleSubmit((data) => handleSubmitData(data))}
        >
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            // onChange={handleChange}
            {...register("email", { required: "Please enter email." })}
          />
          {errors?.email && (
            <span
              style={{
                fontStyle: "italic",
                color: "red",
                fontSize: "12px",
                marginTop: "-18px",
              }}
            >
              Please enter email.
            </span>
          )}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            // onChange={handleChange}
            {...register("password", { required: "Please enter password." })}
          />
          {errors?.password && (
            <span
              style={{
                fontStyle: "italic",
                color: "red",
                fontSize: "12px",
                marginTop: "-18px",
              }}
            >
              Please enter password.
            </span>
          )}
          <Button type="submit">Login</Button>
        </form>
        <p>
          Dont have an account?
          <span className="signup-link">
            <Link href={"/signup"}>Sign up</Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
