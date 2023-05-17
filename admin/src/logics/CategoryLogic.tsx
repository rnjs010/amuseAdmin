import axios from "axios";


export const CategoryLogic = {

	getCategoryArr: (async () => {
		const response = await axios.get(`https://ammuse.store/test/api/category/sequence`)
		return response.data.data;
	}),
}

