/* eslint-disable @next/next/no-img-element */
"use client";
import recipes from "@/app/axios/Services/recipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@splidejs/splide/dist/css/splide.min.css";
import "../../../dashboard/style.css";
import { InfinitySpin } from "react-loader-spinner";
import SearchBar from "@/app/Components/searchBar/page";
const SearchRecipe = () => {
  const params = useParams();
  const router = useRouter();
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [searchRecipeData, setSearchRecipeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getRecipes = async () => {
    setRecipeLoading(true);
    try {
      const res = await recipes.getFilterRecipe(params?.filter);
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
  useEffect(() => {
    getRecipes();
  }, [params?.search]);

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
              <h1>Filter Results...</h1>
              <div className="recipeCards">
                {searchRecipeData?.length > 0 ? (
                  <>
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
