import React, {useEffect, useState} from "react";
import styles from '../../components/Category/Category.module.css'

import {useNavigate} from "react-router-dom";

import Table from "../../components/Table/Table";
import {CategoryTableColumns} from "../../components/Table/CategoryTableColumns";
import {CategoryLogic} from "../../logics/CategoryLogic";

type categoryInfo = {
	id: Number | null;
	title: String | null;
	startDate: Date | null;
	endDate: Date | null;
	adType: String | null;
	adCategory: String | null;
	adContent: String | null;
	createdAdDate: Date | null;
	createdAd: String | null;
	updatedAdDate: Date | null;
	updatedAd: String | null;
	
	
};


const Category = () => {
	
	const navigate = useNavigate();
	
	const [categoryListArr, setCategoryListArr] = useState<categoryInfo[]>([]);
	const [categorySeq, setCategorySeq] = useState<any>([]);
	
	
	useEffect(() => {
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategoryListArr(response);
			setCategorySeq(response.map((v: any) => ({displayHashTag: v.displayHashTag, sequence: v.sequence})));
		})();
	}, [])
	
	
	console.log(categorySeq)
	
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
					onClick={() => navigate('/category/register')}
				>
					등록하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={"category"} columns={CategoryTableColumns} data={categoryListArr}/>
			</div>
		
		</div>
	)
}

export default Category;
