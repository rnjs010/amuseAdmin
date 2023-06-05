import axios from "axios";

export const ComponentLogic = {
	
	getComponentList: (async () => {
		const response = await axios.get(`https://ammuse.store/test/api/component`)
		return response.data.data;
	}),
	
	
}

