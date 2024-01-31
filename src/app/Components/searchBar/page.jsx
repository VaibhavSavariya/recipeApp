import React from "react";
import Link from "next/link";
import { FaPizzaSlice } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { GiChopsticks } from "react-icons/gi";
import "./style.css";
const SearchBar = ({ handleChange, getSearchRecipe, isActive }) => {
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search Recipes..."
          onChange={handleChange}
          onKeyDown={getSearchRecipe}
        />
      </div>
      <div className="filter-bar">
        <Link
          className={`filter-item ${isActive === "italian" ? "active" : ""}`}
          href={"/recipe/cuisine/italian"}
        >
          <div>
            <FaPizzaSlice className="filterMenu" />
          </div>
        </Link>
        <Link
          className={`filter-item ${isActive === "american" ? "active" : ""}`}
          href={"/recipe/cuisine/american"}
        >
          <div>
            <FaHamburger className="filterMenu" />
          </div>
        </Link>
        <Link
          className={`filter-item ${isActive === "thai" ? "active" : ""}`}
          href={"/recipe/cuisine/thai"}
        >
          <div>
            <GiNoodles className="filterMenu" />
          </div>
        </Link>
        <Link
          className={`filter-item ${isActive === "japanese" ? "active" : ""}`}
          href={"/recipe/cuisine/japanese"}
        >
          <div>
            <GiChopsticks className="filterMenu" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchBar;
