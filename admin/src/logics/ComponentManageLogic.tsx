import axios from "axios";

export const ComponentManageLogic = {
  getMainPageComponentList: async () => {
    const response = await axios.get(`http://vikrant.store/test/api/mainPage/list`);
    return response.data.data;
  },

  getMainPageComponentDetail: async (id: any) => {
    const response = await axios.get(`http://vikrant.store/test/api/mainPage/${id}`);
    return response.data.data;
  },

  postComponent: async (data: any) => {
    const response = await axios.post(`http://vikrant.store/test/api/mainPage/create`, data);
    return response;
  },
};
