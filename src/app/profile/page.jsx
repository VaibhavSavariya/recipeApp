/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Button from "../Components/btn/page";
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
const Profile = () => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState("profile");
  const Me = JSON.parse(secureLocalStorage.getItem("Me"));
  const handleLogOut = () => {
    secureLocalStorage.removeItem("Me");
    router.push("/login");
    router.refresh();
  };
  return (
    <>
      <div className="profile-container">
        <div className="sideBar">
          <div
            className={`side-item ${activeSlide === "profile" ? "active" : ""}`}
            onClick={() => setActiveSlide("profile")}
          >
            <CgProfile className="profileMenu" />
          </div>
          <div
            className={`side-item ${
              activeSlide === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveSlide("favorites")}
          >
            <MdFavoriteBorder className="profileMenu" />
          </div>
          <div className="side-item">
            <Link href={"/create-recipe"}>
              <IoCreateOutline className="profileMenu" />
            </Link>
          </div>
          <div
            className={`side-item ${
              activeSlide === "submitRecipe" ? "active" : ""
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
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  defaultValue={Me?.username}
                  disabled
                />

                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder=" Enter Email"
                  defaultValue={Me?.email}
                  disabled
                />

                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  placeholder=" Enter Password"
                  defaultValue={Me?.password}
                  disabled
                />
              </div>
              <div className="image-container">
                <img
                  src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fgeneric-user-icon%2Fgeneric-user-icon-13.jpg&f=1&nofb=1&ipt=cbfd89eabe9a6eb7740748b2184e11c2a23c2fece97d132f92f5c3e8f5e1d0aa&ipo=images"
                  alt="user-profile"
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
                <p>{Me.username}</p>
                <Button className="logoutBtn" onClick={handleLogOut}>
                  Logout
                </Button>
              </div>
            </>
          )}
          {activeSlide === "favorites" && (
            <>
              <h2>Favorites</h2>
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
            </>
          )}
          {activeSlide === "submitRecipe" && (
            <>
              <h2>Submitted Recipes</h2>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
