import axios from "axios";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = `https://api.spoonacular.com`;

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  // "Access-Control-Allow-Origin": "*",
  // "Access-Control-Allow-Credentials": "true",
};
// axiosClient.defaults.withCredentials = true;
