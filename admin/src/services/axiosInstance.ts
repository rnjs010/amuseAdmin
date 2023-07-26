import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://amuseapi.wheelgo.net",
});

export default axiosInstance;
