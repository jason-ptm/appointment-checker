import axios from "axios";
import { JWT_TOKEN } from "./constants";

export const getAxios = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);

  const baseURL = import.meta.env.DEV
    ? "/api"
    : import.meta.env.VITE_BACKEND_API_URL;

  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "X-Request-ID": randomNumber,
      "Content-Type": "application/json",
    },
  });
};

export const getAxiosWithToken = () => {
  const token = localStorage.getItem(JWT_TOKEN);
  const axiosInstance = getAxios();
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axiosInstance;
};
