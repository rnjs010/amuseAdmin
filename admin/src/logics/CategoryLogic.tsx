import axios from "axios";

export const CategoryLogic = {
  getCategoryArr: async () => {
    const response = await axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/category/sequence`);
    return response.data.data;
  },

  postCategory: async (data: any) => {
    const response = await axios.post(`${process.env.REACT_APP_AMUSE_API}/test/api/category/register`, data);
    return response;
  },
};
