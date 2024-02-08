/* eslint-disable @next/next/no-img-element */
"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../../dashboard/style.css";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import recipes from "../../../axios/Services/recipes";
import SearchBar from "../../../Components/searchBar/page";
import Image from "next/image";
import noDataImage from "../../../../../public/No data-amico.png";
import { useTheme } from "next-themes";
const SearchRecipe = () => {
  const { theme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getSearchRecipe = async (e) => {
    try {
      if (e.key === "Enter") {
        router.push(`/recipe/search/${searchQuery}`);
        // getSearchRecipe();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const { isPending, data } = useQuery({
    queryKey: ["searchRecipes", params?.search],
    queryFn: async () => {
      try {
        const res = await recipes.getSearchRecipe(params?.search);
        return res?.data?.results;
      } catch (error) {
        return error;
      }
    },
    enabled: !!params?.search,
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
                Search Results...
              </h1>
              <div className="recipeCards">
                {data?.length > 0 ? (
                  <>
                    <Splide
                      options={{
                        perPage: window.innerWidth <= 768 ? 1 : 4,
                        gap: "5rem",
                        pagination: false,
                        drag: "free",
                      }}
                    >
                      {data?.map((recipe, index) => (
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
                                    "https://img.freepik.com/premium-vector/best-recipes-logo-with-yellow-pan_23-2147492924.jpg";
                                }}
                              />
                              <h4>{recipe?.title}</h4>
                            </Link>
                          </SplideSlide>
                        </>
                      ))}
                    </Splide>
                  </>
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

export default SearchRecipe;
