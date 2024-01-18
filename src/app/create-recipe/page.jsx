"use client";
import React, { useState } from "react";
import "./style.css";
import Button from "../Components/btn/page";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const CreateRecipe = () => {
  const router = useRouter();
  const [recipeForm, setRecipeForm] = useState({
    title: "",
    instructions: "",
    ingredients: [],
    summary: "",
    image:
      "https://img.freepik.com/premium-vector/best-recipes-logo-with-yellow-pan_23-2147492924.jpg",
  });
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
  };
  return (
    <>
      <div className="recipe-form-container">
        <h4>Create a Recipe </h4>
        <div className="form-header">
          <form className="recipe-form" onSubmit={handleSubmitData}>
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
