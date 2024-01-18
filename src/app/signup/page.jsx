"use client";
import Link from "next/link";
import React from "react";
import "./style.css";
import Button from "../Components/btn/page";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    formState,
  } = useForm();
  const router = useRouter();
  const getUsers = JSON.parse(localStorage.getItem("users")) || [];
  const handleSubmitData = (data) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newUser = {
      id,
      ...data,
    };
    localStorage.setItem("users", JSON.stringify([...getUsers, newUser]));
    router.push("/login");
  };
  return (
    <>
      <div className="userContainer">
        <h1>Register Yourself!</h1>
        <form
          className="loginform"
          onSubmit={handleSubmit((data) => handleSubmitData(data))}
        >
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter Username"
            {...register("username", { required: "Please enter Username." })}
          />
          {errors?.username && (
            <span
              style={{
                fontStyle: "italic",
                color: "red",
                fontSize: "12px",
                marginTop: "-18px",
              }}
            >
              Please enter username.
            </span>
          )}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder=" Enter Email"
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
            placeholder=" Enter Password"
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
          <Button type="submit">Sign up</Button>
        </form>
        <p>
          Already have an account?
          <span className="signup-link">
            <Link href={"/login"}>Login</Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export default Signup;
