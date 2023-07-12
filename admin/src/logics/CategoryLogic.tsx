import axios from "axios";

export const CategoryLogic = {
  getCategoryArr: async () => {
    const response = await axios.get(`http://43.200.171.174/test/api/category/sequence`);
    return response.data.data;
  },

  postCategory: async (data: any) => {
    const response = await axios.post("http://43.200.171.174/test/api/category/register", data);
    return response;
  },
};
