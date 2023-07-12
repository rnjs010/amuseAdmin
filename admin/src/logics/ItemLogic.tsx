import axios from "axios";

export const ItemLogic = {
  getProductItems: async (data: any) => {
    const response = await axios.post(`http://43.200.171.174/test/api/product/search`, data);
    return response.data.data.data;
  },

  getProductItemsFromItemCode: async (itemCode: any) => {
    const response = await axios.get(`http://43.200.171.174/test/api/product/${itemCode}`);
    return response.data.data;
  },

  getProductItemsFromTitle: async (page: any, keyword: string) => {
    const response = await axios.get(`http://43.200.171.174/search/title/page=${page}?keyword=${keyword}`);
    return response.data.data;
  },

  getProductItemsFromContent: async (page: any, keyword: string) => {
    const response = await axios.get(`http://43.200.171.174/search/content/page=${page}?keyword=${keyword}`);
    return response.data.data;
  },
};
