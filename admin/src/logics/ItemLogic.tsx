import axios from "axios";

export const ItemLogic = {
  getProductItems: async (data: any) => {
    const response = await axios.post(`https://amuseapi.wheelgo.net/test/api/product/search`, data);
    return response.data.data.data;
  },

  getProductItemsFromItemCode: async (itemCode: any) => {
    const response = await axios.get(`https://amuseapi.wheelgo.net/test/api/product/${itemCode}`);
    return response.data.data;
  },

  getProductItemsFromTitle: async (page: any, keyword: string) => {
    const response = await axios.get(`https://amuseapi.wheelgo.net/search/title/page=${page}?keyword=${keyword}`);
    return response.data.data;
  },

  getProductItemsFromContent: async (page: any, keyword: string) => {
    const response = await axios.get(`https://amuseapi.wheelgo.net/search/content/page=${page}?keyword=${keyword}`);
    return response.data.data;
  },
};
