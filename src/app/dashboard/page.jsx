/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import "./style.css";
import recipes from "../axios/Services/recipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useRouter } from "next/navigation";
import { InfinitySpin } from "react-loader-spinner";
import { FaPizzaSlice } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { GiChopsticks } from "react-icons/gi";

import "./style.css";
const Dashboard = () => {
  const router = useRouter();
  const [recipesData, setRecipesData] = useState([]);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getRecipes = async () => {
    setRecipeLoading(true);
    try {
      const response = await recipes.getRandomRecipes();
      if (response?.data?.status !== "failure") {
        setRecipeLoading(false);
        setRecipesData(response.data);
      }
    } catch (error) {
      console.log("error:", error);
      setRecipeLoading(false);
    }
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const getSearchRecipe = async (e) => {
    try {
      if (e.key === "Enter") {
        router.push(`/recipe/search/${searchQuery}`);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <div
        style={{
          margin: "50px",
        }}
      >
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
        <div className="recipesContainer">
          {recipeLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <InfinitySpin
                visible={true}
                width="200"
                color="black"
                ariaLabel="infinity-spin-loading"
              />
            </div>
          ) : (
            <>
              <h1>Popular Recipes...</h1>
              <div className="recipeCards">
                {recipesData?.recipes?.length > 0 ? (
                  <Splide
                    options={{
                      perPage: window.innerWidth <= 768 ? 1 : 4,
                      gap: "5rem",
                      pagination: false,
                      drag: "free",
                    }}
                  >
                    <>
                      {recipesData.recipes?.map((recipe, index) => (
                        <>
                          <SplideSlide>
                            <Link
                              className="recipeCard"
                              key={recipe.id}
                              href={`/recipe/${recipe?.id}`}
                            >
                              <img
                                src={recipe.image}
                                alt="recipe image"
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null; // prevents looping
                                  currentTarget.src =
                                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fgeneric-user-icon%2Fgeneric-user-icon-13.jpg&f=1&nofb=1&ipt=cbfd89eabe9a6eb7740748b2184e11c2a23c2fece97d132f92f5c3e8f5e1d0aa&ipo=images";
                                }}
                              />
                              <h4>{recipe?.title}</h4>
                            </Link>
                          </SplideSlide>
                        </>
                      ))}
                    </>
                  </Splide>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No Data
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(Dashboard);
