import axios from "axios";

export const ComponentLogic = {
	
	getComponentList: (async () => {
		const response = await axios.get(`https://ammuse.store/test/api/component`)
		return response.data.data;
	}),
	
	getComponentDetail: (async (id: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/component/${id}`)
		return response.data.data;
	}),
	
	postTileComponent: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/component/register/tile`, data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": process.env.REACT_APP_COMPONENT_API_KEY
				}
			})
		return response.data.data;
	}),
	
	editTileComponent: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/component/edit/tile`, data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": process.env.REACT_APP_COMPONENT_API_KEY
				}
			})
		return response.data.data;
	}),
	
	deleteTileComponent: (async (id: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/component/delete/${id}`)
		return response.data.data;
	}),
	
	
}

