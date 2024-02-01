import React from "react";
import Link from "next/link";
import { FaPizzaSlice } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { GiChopsticks } from "react-icons/gi";
import "./style.css";
const SearchBar = ({ handleChange, getSearchRecipe, isActive, theme }) => {
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search Recipes..."
          onChange={handleChange}
          onKeyDown={getSearchRecipe}
          className={theme === "dark" ? "searchText-dark" : "searchText"}
        />
      </div>
      <div className="filter-bar">
        <Link
          className={`filter-item ${
            theme === "dark" ? "filter-item-black" : ""
          } ${isActive === "italian" ? "active" : ""} ${
            isActive === "italian" && theme === "dark" ? "active-black" : ""
          }   `}
          href={"/recipe/cuisine/italian"}
        >
          <div>
            <FaPizzaSlice
              className={theme === "dark" ? "filterMenuDark" : "filterMenu"}
            />
          </div>
        </Link>
        <Link
          className={`filter-item ${
            theme === "dark" ? "filter-item-black" : ""
          } ${isActive === "american" ? "active" : ""} ${
            isActive === "american" && theme === "dark" ? "active-black" : ""
          }   `}
          href={"/recipe/cuisine/american"}
        >
          <div>
            <FaHamburger
              className={theme === "dark" ? "filterMenuDark" : "filterMenu"}
            />
          </div>
        </Link>
        <Link
          className={`filter-item ${
            theme === "dark" ? "filter-item-black" : ""
          } ${isActive === "thai" ? "active" : ""} ${
            isActive === "thai" && theme === "dark" ? "active-black" : ""
          }   `}
          href={"/recipe/cuisine/thai"}
        >
          <div>
            <GiNoodles
              className={theme === "dark" ? "filterMenuDark" : "filterMenu"}
            />
          </div>
        </Link>
        <Link
          className={`filter-item ${
            theme === "dark" ? "filter-item-black" : ""
          } ${isActive === "japanese" ? "active" : ""} ${
            isActive === "japanese" && theme === "dark" ? "active-black" : ""
          }   `}
          href={"/recipe/cuisine/japanese"}
        >
          <div>
            <GiChopsticks
              className={theme === "dark" ? "filterMenuDark" : "filterMenu"}
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default SearchBar;
