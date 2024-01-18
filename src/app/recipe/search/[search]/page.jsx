/* eslint-disable @next/next/no-img-element */
"use client";
import recipes from "@/app/axios/Services/recipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa6";
import { FaHamburger } from "react-icons/fa";
import { GiNoodles } from "react-icons/gi";
import { GiChopsticks } from "react-icons/gi";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../../dashboard/style.css";
import Link from "next/link";
import { InfinitySpin } from "react-loader-spinner";
const SearchRecipe = () => {
  const params = useParams();
  const router = useRouter();
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [searchRecipeData, setSearchRecipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getSearchRecipe = async () => {
    setRecipeLoading(true);
    try {
      const res = await recipes.getSearchRecipe(params?.search);
      if (res?.data?.status !== "failure") {
        setRecipeLoading(false);
        setSearchRecipeData(res?.data?.results);
      }
    } catch (error) {
      setRecipeLoading(false);
      console.log("error:", error);
    }
  };
  const handleInfo = (id) => {
    router.push(`/recipe/${id}`);
  };
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const getSearchRecipeInfo = async (e) => {
    try {
      if (e.key === "Enter") {
        router.push(`/recipe/search/${searchQuery}`);
        // getSearchRecipe();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getSearchRecipe();
  }, [params?.search]);

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
            onKeyDown={getSearchRecipeInfo}
            // value={params?.search}
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
              <h1>Search Results...</h1>
              <div className="recipeCards">
                <Splide
                  options={{
                    perPage: window.innerWidth <= 768 ? 1 : 4,
                    gap: "5rem",
                    pagination: false,
                    drag: "free",
                  }}
                >
                  {searchRecipeData?.map((recipe, index) => (
                    <>
                      <SplideSlide>
                        <div
                          className="recipeCard"
                          key={recipe.id}
                          onClick={() => handleInfo(recipe?.id)}
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
                        </div>
                      </SplideSlide>
                    </>
                  ))}
                </Splide>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchRecipe;
