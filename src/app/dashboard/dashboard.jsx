/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { memo, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { useRouter } from "next/navigation";
import SearchBar from "../Components/searchBar/page";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { getRandomRecipesData } from "../utils/queryFunctions";
import noDataImage from "../../../public/No data-amico.png";
import Image from "next/image";
import { useTheme } from "next-themes";
const Dashboard = () => {
  const { theme } = useTheme();
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

  const { isPending, data } = useQuery({
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
          theme={theme}
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
              <span className={theme === "dark" ? "loader-dark" : "loader"} />
            </div>
          ) : (
            <>
              <h1 className={theme === "dark" ? "h1-dark" : "h1"}>
                Popular Recipes...
              </h1>
              <div className="recipeCards">
                {data?.recipes?.length > 0 ? (
                  <Splide
                    options={{
                      perPage: 4,
                      gap: "5rem",
                      pagination: false,
                      drag: "free",
                      breakpoints: {
                        768: {
                          perPage: 1,
                        },
                      },
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
                    <Image
                      src={noDataImage}
                      alt="no data icon"
                      width={300}
                      height={300}
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
