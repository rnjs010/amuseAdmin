import axios from "axios";

export const AdLogic = {
  getAdArr: async (offset: number, limit: number, page: number) => {
    const response = await axios.get(
      `${process.env.REACT_APP_AMUSE_API}/test/api/ad/getList?offset=${offset}&limit=${limit}&page=${page}`
    );
    return response.data.data;
  },

  getAdDetail: async (id: number) => {
    const response = await axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/ad/${id}`);
    return response.data.data;
  },

  updateAdDetail: async (data: any) => {
    const response = await axios.post(`${process.env.REACT_APP_AMUSE_API}/test/api/ad/edit`, data);
    return response;
  },
};
