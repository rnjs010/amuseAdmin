import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AMUSE_API}`,
});

export default axiosInstance;
