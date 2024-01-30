import recipes from "../axios/Services/recipes";

export const getRandomRecipesData = async () => {
  try {
    const res = await recipes.getRandomRecipes();
    return res?.data;
  } catch (error) {
    return error;
  }
};
