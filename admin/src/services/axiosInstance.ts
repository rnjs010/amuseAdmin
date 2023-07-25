import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://amuseapi.wheelgo.net",
});

export default axiosInstance;
