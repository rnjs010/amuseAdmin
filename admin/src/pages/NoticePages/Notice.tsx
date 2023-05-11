import React from "react";
import styles from '../../components/Notice/Notice.module.css'
import Table from "../../components/Table/Table";
import {NoticeTableColumns} from "../../components/Table/NoticeTableColumns";

import {useNavigate} from "react-router-dom";

const Notice = () => {
	
	const navigate = useNavigate();
	
	return (
		<div className={styles.container}>
			
			
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					borderBottom: "1px solid #eb1749",
					margin: "30px 50px 0px 50px",
					paddingBottom: 10
				}}
			>
				<h2> 공지사항 </h2>
				
				<button
					className={styles.button}
					onClick={() => navigate('/notice/register')}
				>
					등록하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table
					route={'notice'}
					columns={NoticeTableColumns}
					data={
						[
							{
								id: 1,
								title: "테스트",
								createdAdDate: "테스트",
								createdAd: "테스트",
								updatedAdDate: "테스트",
								updatedAd: "테스트"
							}
						]
					}/>
			</div>
		
		</div>
	)
	
}

export default Notice;
