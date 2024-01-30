import axios from "axios";
import recipes from "../axios/Services/recipes";

export const getRandomRecipesData = async () => {
  "use server";
  try {
    const res = await recipes.getRandomRecipes();
    return res?.data;
  } catch (error) {
    return error;
  }
};
// export const getRandomRecipesData = async () => {
//   try {
//     const res = await axios.get("http://localhost:8080/users");
//     return res?.data;
//   } catch (error) {
//     return error;
//   }
// };
