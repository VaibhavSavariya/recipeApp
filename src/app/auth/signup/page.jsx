"use client";
import Link from "next/link";
import React from "react";
import "../login/style.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import Button from "@/app/Components/btn/page";
import { useTheme } from "next-themes";
const Signup = () => {
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    formState,
  } = useForm();
  const router = useRouter();
  const getUsers = JSON.parse(secureLocalStorage.getItem("users")) || [];
  const handleSubmitData = (data) => {
    if (!getUsers.find((user) => user?.email === data?.email)) {
      const id = Math.floor(Math.random() * 1000) + 1;
      const newUser = {
        id,
        ...data,
      };
      secureLocalStorage.setItem(
        "users",
        JSON.stringify([...getUsers, newUser])
      );
      router.push("/auth/login");
      toast.success("Register Successfully!");
    } else {
      toast.error("User already exists. Please login.");
    }
  };
  return (
    <>
      <div className={theme === "dark" ? "userContainerDark" : "userContainer"}>
        <h1 className={theme === "dark" ? "h1-black" : "h1"}>
          Register Yourself!
        </h1>
        <form
          className="loginform"
          onSubmit={handleSubmit((data) => handleSubmitData(data))}
        >
          <label
            className={theme === "dark" ? "login-label-dark" : ""}
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={theme === "dark" ? "login-input-black" : "login-input"}
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
              {errors?.username?.message}
            </span>
          )}
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
              {errors?.email?.message}
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
            placeholder=" Enter Password"
            {...register("password", {
              required: "Please enter password.",
              minLength: {
                value: 4,
                message: "Length must be more than 3 characters.",
              },
            })}
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
              {errors?.password?.message}
            </span>
          )}
          <Button
            className={theme === "dark" ? "loginBtnDark" : ""}
            type="submit"
          >
            Sign up
          </Button>
        </form>
        <p className={theme === "dark" ? "p-black" : ""}>
          Already have an account?
          <span className="signup-link">
            <Link href={"/auth/login"}>Login</Link>
          </span>{" "}
        </p>
      </div>
    </>
  );
};

export default Signup;
