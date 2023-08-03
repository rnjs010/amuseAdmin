import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export const PageLogic = {
  getPageList: async () => {
    const response = await axios.get("https://devapi.wheelgo.net/test/api/page/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response.data.data;
  },

  getPageListNotDisable: async () => {
    const response = await axios.get("https://devapi.wheelgo.net/test/api/page/all?disable=false", {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response.data.data;
  },

  getPageDetail: async (id: any) => {
    const response = await axios.get(`https://devapi.wheelgo.net/test/api/page/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response.data.data;
  },

  registerPage: async (data: any) => {
    const response = await axios.post(`https://devapi.wheelgo.net/test/api/page/register`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response;
  },

  editPage: async (id: any, data: any) => {
    const response = await axios.put(`https://devapi.wheelgo.net/test/api/page/edit/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response;
  },

  deletePage: async (id: any) => {
    const response = await axios.delete(`https://devapi.wheelgo.net/test/api/delete/page/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response;
  },
};
