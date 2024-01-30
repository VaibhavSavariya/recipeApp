/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import recipes from "../axios/Services/recipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useRouter } from "next/navigation";
import SearchBar from "../Components/searchBar/page";
import { QueryClient, useQuery } from "@tanstack/react-query";
import "./style.css";
import { getRandomRecipesData } from "../utils/queryFunctions";
const Dashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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

  const { isPending, isError, data, error, isFetching } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRandomRecipesData,
  });

  return (
    <>
      <div
        style={{
          margin: "50px",
        }}
      >
        <SearchBar
          handleChange={handleChange}
          getSearchRecipe={getSearchRecipe}
        />
        <div className="recipesContainer">
          {isPending ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="loader" />
            </div>
          ) : (
            <>
              <h1>Popular Recipes...</h1>
              <div className="recipeCards">
                {data?.recipes?.length > 0 ? (
                  <Splide
                    options={{
                      perPage: window.innerWidth <= 768 ? 1 : 4,
                      gap: "5rem",
                      pagination: false,
                      drag: "free",
                    }}
                  >
                    <>
                      {data?.recipes?.map((recipe, index) => (
                        <>
                          <SplideSlide key={recipe?.id}>
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
                                    "https://img.freepik.com/premium-vector/best-recipes-logo-with-yellow-pan_23-2147492924.jpg";
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
                    <img
                      src="https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
                      alt="no data icon"
                      style={{
                        height: "200px",
                        width: "200px",
                      }}
                    />
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
