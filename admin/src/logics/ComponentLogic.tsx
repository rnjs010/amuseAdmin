import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const ComponentLogic = {
  getComponentList: async () => {
    const response = await axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/component`);
    return response.data.data;
  },

  getComponentDetail: async (id: any) => {
    const response = await axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/component/${id}`);
    return response.data.data;
  },

  postTileComponent: async (data: any) => {
    const response = await axios.post(`${process.env.REACT_APP_AMUSE_API}/test/api/component/register/tile`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response.data.data;
  },

  editTileComponent: async (data: any) => {
    const response = await axios.post(`${process.env.REACT_APP_AMUSE_API}/test/api/component/edit/tile`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.get("id"),
      },
    });
    return response.data.data;
  },

  deleteTileComponent: async (id: any) => {
    const response = await axios.get(`${process.env.REACT_APP_AMUSE_API}/test/api/component/delete/${id}`);
    return response.data.data;
  },
};
