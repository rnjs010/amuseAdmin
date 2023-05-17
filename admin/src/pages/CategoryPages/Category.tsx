import React, {useEffect, useState} from "react";
import styles from '../../components/Category/Category.module.css'

import axios from "axios";

import {useNavigate} from "react-router-dom";


import Table from "../../components/Table/Table";
import {CategoryTableColumns} from "../../components/Table/CategoryTableColumns";

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
			await axios.get(`https://ammuse.store/test/api/category/sequence`)
				.then(r => {
					const res = r.data
					setCategoryListArr(res.data);
					setCategorySeq(res.data.map((v: any) => ({ displayHashTag: v.displayHashTag, sequence: v.sequence })));
				})
				.catch(e => console.log(e))
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
