"use client";
import React from "react";
import "./style.css";
export const Button = ({ type, children, onClick, className, style }) => {
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
