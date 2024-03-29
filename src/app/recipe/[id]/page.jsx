"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import "./style.css";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import recipes from "../../axios/Services/recipes";
import Button from "@/app/Components/btn/page";
import { useTheme } from "next-themes";
const Recipe = () => {
  const { theme } = useTheme();
  const params = useParams();
  const [activeBtn, setActiveBtn] = useState("Instructions");
  const [activeFav, setActiveFav] = useState(false);
  const getUsers = JSON.parse(secureLocalStorage.getItem("users"));
  const getMe = JSON.parse(secureLocalStorage.getItem("Me"));
  const existingFav = getMe?.favouriteRecipe;
  const FavId = existingFav?.map((recipe) => recipe?.id);

  const handleFav = () => {
    if (!activeFav && getMe?.favouriteRecipe?.length > 0 && getMe?.email) {
      setActiveFav(!activeFav);
      const newUser = getMe?.favouriteRecipe.map((recipe) => {
        secureLocalStorage.setItem(
          "Me",
          JSON.stringify({
            ...getMe,
            favouriteRecipe: [...existingFav, data],
          })
        );
      });
      const getNewUser = JSON.parse(secureLocalStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, favouriteRecipe: getNewUser?.favouriteRecipe }
            : user;
        return updated;
      });
      secureLocalStorage.setItem("users", JSON.stringify(updateUsers));
      toast.success("Added Successfully!");
    } else if (getMe?.email) {
      setActiveFav(!activeFav);
      secureLocalStorage.setItem(
        "Me",
        JSON.stringify({
          ...getMe,
          favouriteRecipe: [data],
        })
      );
      const getNewUser = JSON.parse(secureLocalStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, favouriteRecipe: getNewUser?.favouriteRecipe }
            : user;
        return updated;
      });
      secureLocalStorage.setItem("users", JSON.stringify(updateUsers));
      toast.success("Added Successfully!");
    } else {
      toast.error(
        "To add a recipe to your favourites. Please login to your account."
      );
    }
  };
  const handleFavRemove = () => {
    setActiveFav(!activeFav);

    if (getMe?.email) {
      const isRecipeInFavorites = getMe?.favouriteRecipe?.some(
        (recipe) => recipe.id === parseInt(params.id)
      );
      const updatedFavRecipes = [...getMe?.favouriteRecipe];

      if (isRecipeInFavorites) {
        const updatedFavorites = updatedFavRecipes.filter(
          (recipe) => recipe.id !== parseInt(params.id)
        );
        secureLocalStorage.setItem(
          "Me",
          JSON.stringify({ ...getMe, favouriteRecipe: updatedFavorites })
        );
        const getNewUser = JSON.parse(secureLocalStorage.getItem("Me"));
        const updateUsers = getUsers.map((user) => {
          const updated =
            user?.email === getNewUser?.email
              ? { ...user, favouriteRecipe: updatedFavorites }
              : user;
          return updated;
        });
        secureLocalStorage.setItem("users", JSON.stringify(updateUsers));
        toast.error("Removed Successfully!");
      } else {
        null;
      }
    } else {
      null;
    }
  };

  const { isPending, data } = useQuery({
    queryKey: ["RecipesInfo", params?.id],
    queryFn: async () => {
      try {
        const res = await recipes.getRecipeById(params?.id);
        return res?.data;
      } catch (error) {
        return error;
      }
    },
    enabled: !!params?.id,
  });

  return (
    <>
      <div className="detailWrapper">
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
            <div className="detailLeft">
              <h2 className={theme === "dark" ? "p-black" : ""}>
                {data?.title}
              </h2>
              <img alt="recipe-logo" src={data?.image} width="100px" />
              <p className={theme === "dark" ? "pf-black" : "pf"}>
                Add to Favorites:{" "}
                <span>
                  {FavId?.includes(parseInt(params?.id)) ? (
                    <MdFavorite
                      className={theme === "dark" ? "fav-btn-black" : "fav-btn"}
                      onClick={handleFavRemove}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className={theme === "dark" ? "fav-btn-black" : "fav-btn"}
                      onClick={handleFav}
                    />
                  )}
                </span>
              </p>
              <h2 className={theme === "dark" ? "h-black" : "h-white"}>
                Share with your friends :
              </h2>
              <div className="social-wrapper">
                <TwitterShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaXTwitter
                    className={
                      theme === "dark" ? "social-btn-black" : "social-btn"
                    }
                  />
                </TwitterShareButton>
                <FacebookShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaFacebookF
                    className={
                      theme === "dark" ? "social-btn-black" : "social-btn"
                    }
                  />
                </FacebookShareButton>
                <InstapaperShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaInstagram
                    className={
                      theme === "dark" ? "social-btn-black" : "social-btn"
                    }
                  />
                </InstapaperShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaWhatsapp
                    className={
                      theme === "dark" ? "social-btn-black" : "social-btn"
                    }
                  />
                </WhatsappShareButton>
              </div>
            </div>
            <div className="detailRight">
              <div className="btnWrapper">
                <Button
                  className={`detailBtn ${
                    activeBtn === "Instructions" ? "active" : ""
                  }`}
                  onClick={() => setActiveBtn("Instructions")}
                >
                  Instructions{" "}
                </Button>
                <Button
                  className={`detailBtn ${
                    activeBtn === "Ingredients" ? "active" : ""
                  }`}
                  onClick={() => setActiveBtn("Ingredients")}
                >
                  Ingredients{" "}
                </Button>
              </div>
              {activeBtn === "Instructions" && (
                <div
                  style={{
                    overflow: "auto",
                    height: "350px",
                  }}
                  className={
                    theme === "dark" ? "instructions-black" : "instructions"
                  }
                >
                  <p
                    dangerouslySetInnerHTML={{ __html: data?.summary }}
                    className={
                      theme === "dark" ? "descriptionBlack" : "description"
                    }
                  ></p>
                  <p> ------ </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.instructions,
                    }}
                    className={
                      theme === "dark" ? "descriptionBlack" : "description"
                    }
                  ></p>
                </div>
              )}
              {activeBtn === "Ingredients" && (
                <ul
                  style={{
                    listStyle: "disc",
                    width: window.innerWidth <= 768 ? "300px" : "500px",
                  }}
                >
                  {data?.extendedIngredients?.map((ingredient, index) => (
                    <li
                      style={{
                        marginBottom: "5px",
                        color: theme === "dark" ? "white" : "",
                      }}
                      key={ingredient?.id}
                    >
                      {ingredient?.original}{" "}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Recipe), { ssr: false });
