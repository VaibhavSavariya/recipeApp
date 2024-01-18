import { axiosClient } from "../Axios";
// All Endpoints.

export const getRandomRecipes = () => {
  return axiosClient.get(
    `/recipes/random?number=10&apiKey=${process.env.apiKey}`
  );
};
export const getRecipeById = (id) => {
  return axiosClient.get(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.apiKey}`
  );
};
export const getSearchRecipe = (search) => {
  return axiosClient.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=10&apiKey=${process.env.apiKey}`
  );
};
export const getFilterRecipe = (filter) => {
  return axiosClient.get(
    `https://api.spoonacular.com/recipes/complexSearch?&number=10&apiKey=${process.env.apiKey}&cuisine=${filter}`
  );
};

const recipes = {
  getRandomRecipes,
  getRecipeById,
  getSearchRecipe,
  getFilterRecipe,
};
export default recipes;
