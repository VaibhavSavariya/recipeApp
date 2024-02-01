"use client";
import React, { useState } from "react";
import "./style.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Button from "@/app/Components/btn/page";
import { useTheme } from "next-themes";
const Login = () => {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    formState,
  } = useForm();

  const router = useRouter();
  const getUsers = JSON.parse(secureLocalStorage.getItem("users"));

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
      secureLocalStorage.setItem("Me", JSON.stringify(existingUser));
      router.push("/");
      router.refresh();
    } else {
      toast.error(
        "Authetication Failed: the entered email or Password is incorrect. OR User account doesn't exists."
      );
    }
  };

  return (
    <>
      <div className={theme === "dark" ? "userContainerDark" : "userContainer"}>
        <h1 className={theme === "dark" ? "h1-black" : "h1"}>Welcome Back!</h1>
        <form
          className="loginform"
          onSubmit={handleSubmit((data) => handleSubmitData(data))}
        >
          <label
            className={theme === "dark" ? "login-label-dark" : ""}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={theme === "dark" ? "login-input-black" : "login-input"}
            id="email"
            type="email"
            placeholder="Enter Email"
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
          <label
            className={theme === "dark" ? "login-label-dark" : ""}
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={theme === "dark" ? "login-input-black" : "login-input"}
            id="password"
            type="password"
            placeholder="Enter Password"
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
          <Button
            className={theme === "dark" ? "loginBtnDark" : ""}
            type="submit"
          >
            Login
          </Button>
        </form>
        <p className={theme === "dark" ? "p-black" : ""}>
          Dont have an account?
          <span className="signup-link">
            <Link href={"/auth/signup"}>Sign up</Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
