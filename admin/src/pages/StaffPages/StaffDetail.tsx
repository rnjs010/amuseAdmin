import React from "react";
import {useParams} from "react-router-dom";

const StaffDetail = () => {
	
	const { id } = useParams()
	
	
	return(
		<div>
			{id}
		</div>
	)
}

export default StaffDetail
