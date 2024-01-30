"use client";
import React from "react";
import "./style.css";
const Button = ({ type, children, onClick, className, style }) => {
  return (
    <>
      <button
        type={type}
        className={`loginBtn ${className ? className : ""}`}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
