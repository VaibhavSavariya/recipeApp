"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./style.css";
import secureLocalStorage from "react-secure-storage";
const Navbar = () => {
  const Me = JSON.parse(secureLocalStorage.getItem("Me"));
  return (
    <>
      <header className="navbar">
        <Link href={"/"}>Recipe App</Link>
        <div className="nav-items">
          {Me ? (
            <>
              <Link href={"/create-recipe"}>Submit Recipe</Link>
              <Link href={"/profile"}>Profile</Link>
            </>
          ) : (
            <>
              {/* <Link href={"/about"}>About</Link> */}
              <Link href={"/login"}>Login</Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
