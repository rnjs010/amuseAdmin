import axios from "axios";

export const ComponentManageLogic = {
	
	getMainPageComponentList: (async () => {
		const response = await axios.get(`https://ammuse.store/test/api/mainPage/list`)
		return response.data.data;
	}),
	
	getMainPageComponentDetail: (async (id: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/mainPage/${id}`)
		return response;
	}),
	
	postComponent: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/mainPage/create`, data)
		return response;
	}),
	
}

