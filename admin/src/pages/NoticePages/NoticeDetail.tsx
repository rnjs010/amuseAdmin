import React, {useRef} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import ToastEditor from "../../components/ToastEditor";


const NoticeDetail = () => {
	
	const {id} = useParams();
	
	const navigate = useNavigate();
	
	const onClickRoute = (id: number) => {
		navigate(`/staff/${id}`);
	};
	
	return (
		<>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>id</div>
				<div style={{width: 'auto'}}>{id}</div>
			</p>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>제목</div>
				<div style={{width: 'auto'}}>테스트 제목입니다</div>
			</p>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>등록일자</div>
				<div style={{width: 'auto'}}>2023-05-01</div>
			</p>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>등록자</div>
				<div style={{width: 'auto'}}>Admin1</div>
				<button style={{width: 50, height: 20, border: "1px solid"}}
						onClick={() => onClickRoute(1)}
				>상세
				</button>
			</p>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>수정일자</div>
				<div style={{width: 'auto'}}>2023-05-01</div>
			</p>
			
			<p style={{display: "flex", flexDirection: 'row'}}>
				<div style={{width: 100}}>수정자</div>
				<div style={{width: 'auto'}}>Admin2</div>
				<button style={{width: 50, height: 20, border: "1px solid"}}
						onClick={() => onClickRoute(2)}>
					상세
				</button>
			</p>
			{/*<ToastEditor*/}
			
			{/*></ToastEditor>*/}
		</>
	
	)
	
}

export default NoticeDetail;
