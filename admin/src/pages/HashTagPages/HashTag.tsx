import React, { useState, useEffect } from "react";
import styles from '../../components/HashTag/HashTag.module.css'

import {useNavigate} from "react-router-dom";

import Table from "../../components/Table/Table";
import {HashTagTableColumns} from "../../components/Table/HashTagTableColumns";

const HashTag = () => {
	
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
				<h2> 해시태그 관리 </h2>
				
				<button
					className={styles.button}
					onClick={() => navigate('/hashtag/register')}
				>
					등록하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={"hashtag"} columns={HashTagTableColumns} data={[]}/>
			</div>
		
		</div>
	)
	
}

export default HashTag
