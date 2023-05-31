import axios from "axios";

export const ItemLogic = {
	
	getProductItems: (async (data: any) => {
		const response = await axios.post(`https://ammuse.store/test/api/product/search`, data)
		return response.data.data.data;
	}),
	
	getProductItemsFromItemCode: (async (itemCode: any) => {
		const response = await axios.get(`https://ammuse.store/test/api/product/${itemCode}`)
		return response.data.data;
	}),
	
}

