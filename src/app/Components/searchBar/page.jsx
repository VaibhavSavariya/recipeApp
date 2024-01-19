import React from "react";
import Link from "next/link";
import { FaPizzaSlice } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { GiChopsticks } from "react-icons/gi";
import "./style.css";
const SearchBar = ({ handleChange, getSearchRecipe }) => {
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
        <div className="filter-item">
          <Link href={"/recipe/cuisine/italian"}>
            <FaPizzaSlice className="filterMenu" />
          </Link>
        </div>
        <div className="filter-item">
          <Link href={"/recipe/cuisine/american"}>
            <FaHamburger className="filterMenu" />
          </Link>
        </div>
        <div className="filter-item">
          <Link href={"/recipe/cuisine/thai"}>
            <GiNoodles className="filterMenu" />
          </Link>
        </div>
        <div className="filter-item">
          <Link href={"/recipe/cuisine/japanese"}>
            <GiChopsticks className="filterMenu" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
