/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdFavoriteBorder } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import "@splidejs/splide/dist/css/splide.min.css";
import "./style.css";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import secureLocalStorage from "react-secure-storage";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../Components/btn/page";
import { useTheme } from "next-themes";
import Image from "next/image";
import userImage from "../../../public/user-png-33842.png";
import noDataImage from "../../../public/No data-amico.png";
const Profile = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState("profile");
  const Me = JSON.parse(secureLocalStorage.getItem("Me"));
  const handleLogOut = () => {
    secureLocalStorage.removeItem("Me");
    router.push("/auth/login");
    router.refresh();
  };
  useInfiniteQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users", {
          params: {
            _page: 1,
            _limit: 4,
          },
        })
        .then((res) => res.data),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  return (
    <>
      <div className="profile-container">
        <div className="sideBar">
          <div
            className={`side-item ${
              theme === "dark" ? "side-item-black" : ""
            } ${activeSlide === "profile" ? "active" : ""} ${
              activeSlide === "profile" && theme === "dark"
                ? "active-black"
                : ""
            }`}
            onClick={() => setActiveSlide("profile")}
          >
            <CgProfile className="profileMenu" />
          </div>
          <div
            className={`side-item ${
              theme === "dark" ? "side-item-black" : ""
            } ${activeSlide === "favorites" ? "active" : ""} ${
              activeSlide === "favorites" && theme === "dark"
                ? "active-black"
                : ""
            }`}
            onClick={() => setActiveSlide("favorites")}
          >
            <MdFavoriteBorder className="profileMenu" />
          </div>
          <div
            className={`side-item ${theme === "dark" ? "side-item-black" : ""}`}
          >
            <Link href={"/create-recipe"}>
              <IoCreateOutline className="profileMenu" />
            </Link>
          </div>
          <div
            className={`side-item ${
              theme === "dark" ? "side-item-black" : ""
            } ${activeSlide === "submitRecipe" ? "active" : ""} ${
              activeSlide === "submitRecipe" && theme === "dark"
                ? "active-black"
                : ""
            }`}
            onClick={() => setActiveSlide("submitRecipe")}
          >
            <FaList className="profileMenu" />
          </div>
        </div>
        <div
          className={
            activeSlide === "profile" ? "profileRight" : "profileRightFav"
          }
        >
          {activeSlide === "profile" && (
            <>
              <div className="user-info">
                <label
                  className={theme === "dark" ? "label-black" : ""}
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  defaultValue={Me?.username}
                  disabled
                  className={theme === "dark" ? "input-black" : ""}
                />

                <label
                  className={theme === "dark" ? "label-black" : ""}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder=" Enter Email"
                  defaultValue={Me?.email}
                  disabled
                  className={theme === "dark" ? "input-black" : ""}
                />

                <label
                  className={theme === "dark" ? "label-black" : ""}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  placeholder=" Enter Password"
                  defaultValue={Me?.password}
                  disabled
                  className={theme === "dark" ? "input-black" : ""}
                />
              </div>
              <div className="image-container">
                <Image
                  src={userImage}
                  alt="user-profile"
                  width={200}
                  height={200}
                />
                <p className={theme === "dark" ? "p-black" : ""}>
                  {Me?.username}
                </p>
                <Button
                  theme={theme}
                  className="logoutBtn"
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
          {activeSlide === "favorites" && (
            <>
              <h2 className={theme === "dark" ? "p-black" : ""}>Favorites</h2>
              {Me?.favouriteRecipe?.length > 0 ? (
                <Splide
                  options={{
                    perPage: window.innerWidth <= 768 ? 1 : 3,
                    gap: "2rem",
                    pagination: false,
                    drag: "free",
                  }}
                >
                  <>
                    {Me.favouriteRecipe?.map((recipe, index) => (
                      <>
                        <SplideSlide>
                          <Link
                            className="recipeCard"
                            key={recipe.id}
                            href={`${
                              typeof recipe.id === "string"
                                ? `/submitted-recipe/${recipe?.id}`
                                : `/recipe/${recipe?.id}`
                            } `}
                            // onClick={() => handleInfo(recipe?.id)}
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
            </>
          )}
          {activeSlide === "submitRecipe" && (
            <>
              <h2 className={theme === "dark" ? "p-black" : ""}>
                Submitted Recipes
              </h2>
              {Me?.submittedRecipe?.length > 0 ? (
                <Splide
                  options={{
                    perPage: window.innerWidth <= 768 ? 1 : 3,
                    gap: "2rem",
                    pagination: false,
                    drag: "free",
                  }}
                >
                  <>
                    {Me.submittedRecipe?.map((recipe, index) => (
                      <>
                        <SplideSlide>
                          <Link
                            className="recipeCard"
                            key={recipe.id}
                            href={`${
                              typeof recipe.id === "string"
                                ? `/submitted-recipe/${recipe?.id}`
                                : `/recipe/${recipe?.id}`
                            } `}
                            // onClick={() => handleInfo(recipe?.id)}
                          >
                            <img
                              src={recipe.image}
                              alt="recipe image"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                  "https://img.freepik.com/premium-vector/best-recipes-logo-with-yellow-pan_23-2147492924.jpg";
                              }}
                              onload={() => {
                                URL.revokeObjectURL(recipe.image);
                              }}
                            />
                            <h4
                              style={{
                                fontWeight: 800,
                              }}
                            >
                              {recipe?.title}
                            </h4>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
