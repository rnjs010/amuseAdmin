import axios from "axios";

export const PageLogic = {
	
	getPageList: (async () => {
		const response = await axios.get("https://ammuse.store/test/api/page/all");
		return response.data.data;
	}),
	
	getPageDetail: (async (id: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/page/${id}`);
		return response.data.data;
	}),
	
}

