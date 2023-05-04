import axios from "axios";


export const AdApiLogic = {
	
	
	getTestAdList : (async () => {
			return await axios.get(`${process.env.REACT_APP_API_URL}/test/api/ad/getList`);
		})
		
		
	
	

}

