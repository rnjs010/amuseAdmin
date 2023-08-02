import axios from "axios";

export const CategoryLogic = {
  getCategoryArr: async () => {
    const response = await axios.get(`https://devapi.wheelgo.net/test/api/category/sequence`);
    return response.data.data;
  },

  postCategory: async (data: any) => {
    const response = await axios.post("https://devapi.wheelgo.net/test/api/category/register", data);
    return response;
  },
};
