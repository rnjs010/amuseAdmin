import React from "react";
import styles from '../components/Category/Category.module.css'

import Table from "../components/Table/Table";
import {CategoryTableColumns} from "../components/Table/CategoryTableColumns";

const data = [
		{
			id: 1,
			category: "아이돌봄 여행",
			createdAt: "2023-05-03T12:59:47.087504",
			createdBy: "daw916@naver.com",
			count: 100
		},
		{
			id: 2,
			category: "아이돌봄 여행",
			createdAt: "2023-05-03T12:59:47.087504",
			createdBy: "daw916@naver.com",
			count: 100
		},
		{
			id: 3,
			category: "아이돌봄 여행",
			createdAt: "2023-05-03T12:59:47.087504",
			createdBy: "daw916@naver.com",
			count: 100
		},
		{
			id: 4,
			category: "아이돌봄 여행",
			createdAt: "2023-05-03T12:59:47.087504",
			createdBy: "daw916@naver.com",
			count: 100
		},
		{
			id: 5,
			category: "아이돌봄 여행",
			createdAt: "2023-05-03T12:59:47.087504",
			createdBy: "daw916@naver.com",
			count: 100
		}
		
	]

const Category = () => {
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
				<h2> 카테고리 관리 </h2>
				
				<button
					className={styles.button}
					onClick={() => console.log("클릭되었습니다.")}
				>
					등록하기
				</button>
			</div>
			
			<div>
				<Table columns={CategoryTableColumns} data={data}/>
			</div>
		
		</div>
	)
}

export default Category;
