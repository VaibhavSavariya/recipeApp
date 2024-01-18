/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "next-share";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import Button from "@/app/Components/btn/page";
import "./style.css";
const SubmittedRecipe = () => {
  const params = useParams();
  const [infoLoading, setInfoLoading] = useState(false);
  const [recipeInfo, setRecipeInfo] = useState({});
  const [activeBtn, setActiveBtn] = useState("Instructions");
  const [activeFav, setActiveFav] = useState(false);

  const getUsers = JSON.parse(localStorage.getItem("users"));
  const getMe = JSON.parse(localStorage.getItem("Me"));
  const existingFav = getMe?.favouriteRecipe;
  const FavId = existingFav?.map((recipe) => recipe?.id);

  const getRecipeInfo = () => {
    setInfoLoading(true);
    try {
      const res = getMe?.submittedRecipe.find(
        (recipe, index) => recipe?.id === params?.id
      );

      setInfoLoading(false);
      setRecipeInfo(res);
    } catch (error) {
      setInfoLoading(false);
      console.log("error:", error);
    }
  };
  const handleFav = () => {
    setActiveFav(!activeFav);

    if (getMe?.email) {
      const isRecipeInFavorites = getMe?.favouriteRecipe?.some(
        (recipe) => recipe.id === params.id
      );
      const updatedFavRecipes = [...getMe?.favouriteRecipe];

      if (isRecipeInFavorites) {
        const updatedFavorites = updatedFavRecipes.filter(
          (recipe) => recipe.id !== params.id
        );
        localStorage.setItem(
          "Me",
          JSON.stringify({ ...getMe, favouriteRecipe: updatedFavorites })
        );
        const getNewUser = JSON.parse(localStorage.getItem("Me"));
        const updateUsers = getUsers.map((user) => {
          const updated =
            user?.email === getNewUser?.email
              ? { ...user, favouriteRecipe: updatedFavorites }
              : user;
          return updated;
        });
        localStorage.setItem(
          "users",
          JSON.stringify([...getUsers, updateUsers])
        );
      } else {
        const newRecipe = recipeInfo;
        updatedFavRecipes.push(newRecipe);
        localStorage.setItem(
          "Me",
          JSON.stringify({ ...getMe, favouriteRecipe: updatedFavRecipes })
        );
      }

      const updatedUsers = getUsers.map((user) => {
        const updatedUser =
          user.email === getMe?.email
            ? { ...user, favouriteRecipe: updatedFavRecipes }
            : user;
        return updatedUser;
      });

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    } else {
      alert("Please login to add favorites.");
    }
  };

  useEffect(() => {
    getRecipeInfo();
  }, [params?.id]);

  return (
    <>
      <div className="detailWrapper">
        {infoLoading ? (
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
            <div className="detailLeft">
              <h2>{recipeInfo?.title}</h2>
              <img alt="recipe-logo" src={recipeInfo?.image} width="100px" />
              <p
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Add to Favorites:{" "}
                <span>
                  {FavId?.includes(params?.id) ? (
                    <MdFavorite className="fav-btn" onClick={handleFav} />
                  ) : (
                    <MdFavoriteBorder className="fav-btn" onClick={handleFav} />
                  )}
                </span>
              </p>
              <h2
                style={{
                  fontSize: "14px",
                  marginTop: "20px",
                }}
              >
                Share with your friends :
              </h2>
              <div className="social-wrapper">
                <TwitterShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaXTwitter className="social-btn" />
                </TwitterShareButton>
                <FacebookShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaFacebookF className="social-btn" />
                </FacebookShareButton>
                <InstapaperShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaInstagram className="social-btn" />
                </InstapaperShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  quote={"Checkout this amazing recipe."}
                  hashtag={"#recipe"}
                >
                  <FaWhatsapp className="social-btn" />
                </WhatsappShareButton>
              </div>
            </div>
            <div className="detailRight">
              <div className="btnWrapper">
                <Button
                  className={`detailBtns ${
                    activeBtn === "Instructions" ? "active" : ""
                  }`}
                  onClick={() => setActiveBtn("Instructions")}
                >
                  Instructions{" "}
                </Button>
                <Button
                  className={`detailBtns ${
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
                  className="instructions"
                >
                  <p
                    dangerouslySetInnerHTML={{ __html: recipeInfo?.summary }}
                    className="description"
                  ></p>
                  <p> ------ </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipeInfo?.instructions,
                    }}
                    className="description"
                  ></p>
                </div>
              )}
              {activeBtn === "Ingredients" && (
                <ul
                  style={{
                    listStyle: "disc",
                    width: window.innerWidth <= 768 ? "auto" : "500px",
                  }}
                >
                  {recipeInfo?.ingredients.map((ingredient, index) => (
                    <li
                      style={{
                        marginBottom: "5px",
                      }}
                      key={index}
                    >
                      {ingredient}{" "}
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

export default SubmittedRecipe;
