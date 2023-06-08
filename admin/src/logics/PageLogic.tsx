import axios from "axios";

export const PageLogic = {
	
	getPageList: (async () => {
		const response = await axios.get("https://ammuse.store/test/api/page/all");
		return response.data.data;
	}),
	
	getPageListNotDisable: (async () => {
		const response = await axios.get("https://ammuse.store/test/api/page/all?disable=false");
		return response.data.data;
	}),
	
	getPageDetail: (async (id: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/page/${id}`);
		return response.data.data;
	}),
	
	registerPage: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/page/register`, data, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": process.env.REACT_APP_COMPONENT_API_KEY
			}
		});
		return response;
	}),
	
	editPage: (async (id: any, data: any) => {
		const response = await axios.put(`https://ammuse.store/test/api/page/edit/${id}`, data, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": process.env.REACT_APP_COMPONENT_API_KEY
			}
		});
		return response;
	}),
	
	
	
}
