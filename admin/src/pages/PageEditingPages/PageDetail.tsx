import React from "react";

import {useParams} from "react-router-dom";

const PageDetail = () => {
	
	const {id} = useParams();
	
	return(
		<div>
			{id}
		</div>
	)
	
	
	
	
}

export default PageDetail;
