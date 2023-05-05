import React from "react";
import {useParams} from "react-router-dom";

const NoticeDetail = () => {
	
	const { id } = useParams();
	
	return(
		<>
			<div>asdasda</div>
			<div>{id}</div>
		</>

	)
	
}

export default NoticeDetail;
