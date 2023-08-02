import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://devapi.wheelgo.net",
});

export default axiosInstance;
