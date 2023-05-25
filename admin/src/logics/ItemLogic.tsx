import axios from "axios";

export const ItemLogic = {
	
	getProductItems: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/product/search`, data)
		return response.data.data.data;
	}),
}

