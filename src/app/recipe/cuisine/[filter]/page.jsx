/* eslint-disable @next/next/no-img-element */
"use client";
import recipes from "@/app/axios/Services/recipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../../dashboard/style.css";
import SearchBar from "@/app/Components/searchBar/page";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
const SearchRecipe = () => {
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
    queryKey: ["filterRecipes", params?.filter],
    queryFn: async () => {
      try {
        const res = await recipes.getFilterRecipe(params?.filter);
        return res?.data?.results;
      } catch (error) {
        return error;
      }
    },
    enabled: !!params?.filter,
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
              <h1>Filter Results...</h1>
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

export default SearchRecipe;
