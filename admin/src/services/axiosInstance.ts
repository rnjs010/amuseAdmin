import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_AMUSE_API}`,
});
export const axiosTokenRefresh =async (token:string) => {
  await axiosInstance.get("/api/v1/auth/refresh", {
    headers: {
      "Content-Type": "application/json",
      Authorization:token
    },
  })
  .then((Response)=>{
    let newToken =Response.data.data.newAccessToken.token
    return newToken
  })
  .catch((error)=>{

  }) 
}

export default axiosInstance;
