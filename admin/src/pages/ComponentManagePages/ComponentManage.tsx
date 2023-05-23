import React, {useEffect, useState} from "react";

import styles from '../../components/ComponentManage/ComponentManage.module.css'
import {CategoryLogic} from "../../logics/CategoryLogic";
import category from "../CategoryPages/Category";
import Table from "../../components/Table/Table";
import {ComponentListTableColumn} from "../../components/Table/ComponentListTableColumn";
import {CategoryTableColumns} from "../../components/Table/CategoryTableColumns";
import {useNavigate} from "react-router-dom";

const MainPageComponenetsListArr = [
	{
		id: 1,
		component: "실시간 Best 여행 상품🏞",
		sequence: 1,
		type: "리스트",
		createAt: "2023-05-17T17:30:47.55265",
		createdBy: "daw916@naver.com",
	},
	{
		id: 2,
		component: "어뮤즈의 최신 여행 패키지🚙",
		sequence: 2,
		type: "리스트",
		createAt: "2023-05-17T17:30:47.55265",
		createdBy: "daw916@naver.com",
	},
	{
		id: 3,
		component: "전해드릴 소식이 있어요📢",
		sequence: 3,
		type: "배너",
		createAt: "2023-05-17T17:30:47.55265",
		createdBy: "daw916@naver.com",
	},
	{
		id: 4,
		component: "지역 별 여행 상품📍",
		sequence: 4,
		type: "타일",
		createAt: "2023-05-17T17:30:47.55265",
		createdBy: "daw916@naver.com",
	}
]


const ComponentManage = () => {
	
	const navigate = useNavigate();
	
	const [categoryListArr, setCategoryListArr] = useState<any[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategoryListArr(response)
		})()
	}, []);
	
	
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
				<h2> 메인페이지 관리 </h2>
				
				<button className={styles.button}
						onClick={() => navigate('/component/mainpage')}
				>
					추가하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={""} columns={ComponentListTableColumn} data={MainPageComponenetsListArr}/>
			</div>
			
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
				<h2> 카테고리별 관리 </h2>
				
				<button className={styles.button}>
					추가하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={"category"} columns={CategoryTableColumns} data={categoryListArr}/>
			</div>
		</div>
	)
}

export default ComponentManage
