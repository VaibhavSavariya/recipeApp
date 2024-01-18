"use client";
import React, { useRef, useState } from "react";
import "./style.css";
import Button from "../Components/btn/page";
import { GrUpload } from "react-icons/gr";
import Image from "next/image";
import toast from "react-hot-toast";

const CreateRecipe = () => {
  const imageRef = useRef();
  const [recipeForm, setRecipeForm] = useState({
    title: "",
    instructions: "",
    ingredients: [],
    summary: "",
    image: "",
  });

  /** JSON DATA **/
  const getUsers = JSON.parse(localStorage.getItem("users"));
  const getMe = JSON.parse(localStorage.getItem("Me"));
  const existingSub = getMe?.submittedRecipe;

  const handleIngredients = () => {
    setRecipeForm({
      ...recipeForm,
      ingredients: [...recipeForm?.ingredients, ""],
    });
  };

  const handleChange = (e) => {
    setRecipeForm({
      ...recipeForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeIngredient = (e, index) => {
    const { value } = e.target;
    const ingredients = recipeForm?.ingredients;
    ingredients[index] = value;

    setRecipeForm({
      ...recipeForm,
      ingredients,
    });
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000) + "UUID";
    if (getMe?.submittedRecipe?.length > 0) {
      const newRecipe = {
        id,
        ...recipeForm,
      };
      const newUser = getMe?.submittedRecipe.map((recipe) => {
        localStorage.setItem(
          "Me",
          JSON.stringify({
            ...getMe,
            submittedRecipe: [...existingSub, newRecipe],
          })
        );
      });
      const getNewUser = JSON.parse(localStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, submittedRecipe: getNewUser?.submittedRecipe }
            : user;
        return updated;
      });
      localStorage.setItem("users", JSON.stringify(updateUsers));
      setRecipeForm({
        title: "",
        instructions: "",
        ingredients: [],
        summary: "",
      });
    } else {
      localStorage.setItem(
        "Me",
        JSON.stringify({
          ...getMe,
          submittedRecipe: [{ id, ...recipeForm }],
        })
      );
      const getNewUser = JSON.parse(localStorage.getItem("Me"));
      const updateUsers = getUsers.map((user) => {
        const updated =
          user?.email === getNewUser?.email
            ? { ...user, submittedRecipe: getNewUser?.submittedRecipe }
            : user;
        return updated;
      });
      localStorage.setItem("users", JSON.stringify(updateUsers));
      setRecipeForm({
        title: "",
        instructions: "",
        ingredients: [],
        summary: "",
      });
    }
    toast.success("Recipe Created Successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = reader.result;
        setRecipeForm({ ...recipeForm, image: imageData });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="recipe-form-container">
        <h4>Create a Recipe </h4>
        <div className="form-header">
          <form className="recipe-form" onSubmit={handleSubmitData}>
            <div className="imgBtn">
              <input
                type="file"
                ref={imageRef}
                hidden
                accept="images/*"
                onChange={handleImageUpload}
              />
              <div
                className="upload-icon"
                onClick={() => imageRef.current.click()}
              >
                <GrUpload />
              </div>
              {!recipeForm?.image && <p>Choose file to upload</p>}
              {recipeForm?.image && (
                <Image
                  src={recipeForm?.image}
                  alt="recipe-image"
                  width={100}
                  height={80}
                  style={{
                    borderRadius: "10px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              onChange={handleChange}
              value={recipeForm?.title}
              required
            />
            {recipeForm?.title.length < 0 && (
              <span
                style={{
                  fontStyle: "italic",
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-18px",
                }}
              >
                Please enter title.
              </span>
            )}
            <label htmlFor="instructions">Instructions</label>
            <textarea
              type="text"
              id="instructions"
              rows="4"
              cols="50"
              placeholder=" Enter instructions"
              onChange={handleChange}
              value={recipeForm?.instructions}
              required
            />

            {recipeForm?.ingredients.map((ingredient, index) => (
              <input
                id="ingredients"
                type="text"
                key={index}
                placeholder="Please add ingredient"
                // value={ingredient}
                onChange={(e) => handleChangeIngredient(e, index)}
                required
              />
            ))}
            <Button type="button" onClick={handleIngredients}>
              Add Ingredients
            </Button>
            <label htmlFor="summary">Summary</label>
            <textarea
              type="text"
              id="summary"
              rows="4"
              cols="50"
              placeholder=" Enter summary"
              onChange={handleChange}
              value={recipeForm?.summary}
              required
            />

            <Button
              style={{
                width: "200px",
              }}
              type="submit"
            >
              Submit Recipe
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;
