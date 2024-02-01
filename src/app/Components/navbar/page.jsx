"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./style.css";
import { IoIosSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";

import secureLocalStorage from "react-secure-storage";
import { useTheme } from "next-themes";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const Me = JSON.parse(secureLocalStorage.getItem("Me"));
  const { theme, setTheme } = useTheme();
  console.log("theme:", theme);
  return (
    <>
      <header className={theme === "dark" ? "navbar-dark" : "navbar"}>
        <Link href={"/"}>Recipe App</Link>
        <div className="nav-items">
          {Me ? (
            <>
              <Link href={"/create-recipe"}>Submit Recipe</Link>
              <Link href={"/profile"}>Profile</Link>
            </>
          ) : (
            <>
              <Link href={"/auth/login"}>Login</Link>
            </>
          )}
          {!toggle ? (
            <IoIosSunny
              onClick={() => {
                setToggle(!toggle);
                setTheme("dark");
              }}
              style={{
                cursor: "pointer",
              }}
              size={24}
            />
          ) : (
            <BsMoonStarsFill
              onClick={() => {
                setToggle(!toggle);
                setTheme("light");
              }}
              style={{
                cursor: "pointer",
              }}
              size={24}
            />
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
