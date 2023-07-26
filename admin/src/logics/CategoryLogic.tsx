import axios from "axios";

export const CategoryLogic = {
  getCategoryArr: async () => {
    const response = await axios.get(`https://amuseapi.wheelgo.net/test/api/category/sequence`);
    return response.data.data;
  },

  postCategory: async (data: any) => {
    const response = await axios.post("https://amuseapi.wheelgo.net/test/api/category/register", data);
    return response;
  },
};
