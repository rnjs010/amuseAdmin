import axios from "axios";

export const AdLogic = {
  getAdArr: async (offset: number, limit: number, page: number) => {
    const response = await axios.get(
      `http://vikrant.store/test/api/ad/getList?offset=${offset}&limit=${limit}&page=${page}`
    );
    return response.data.data;
  },

  getAdDetail: async (id: number) => {
    const response = await axios.get(`http://vikrant.store/test/api/ad/${id}`);
    return response.data.data;
  },

  updateAdDetail: async (data: any) => {
    const response = await axios.post(`http://vikrant.store/test/api/ad/edit`, data);
    return response;
  },
};
