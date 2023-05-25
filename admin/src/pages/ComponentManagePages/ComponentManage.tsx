import React, {useEffect, useState} from "react";

import styles from '../../components/ComponentManage/ComponentManage.module.css'
import {CategoryLogic} from "../../logics/CategoryLogic";
import category from "../CategoryPages/Category";
import Table from "../../components/Table/Table";
import {ComponentListTableColumn} from "../../components/Table/ComponentListTableColumn";
import {CategoryTableColumns} from "../../components/Table/CategoryTableColumns";
import {useNavigate} from "react-router-dom";
import {ComponentManageLogic} from "../../logics/ComponentManageLogic";


const ComponentManage = () => {
	
	const navigate = useNavigate();
	
	const [mainPageComponenetsListArr, setMainPageComponenetsListArr] = useState<any[]>([]);
	const [categoryListArr, setCategoryListArr] = useState<any[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await ComponentManageLogic.getMainPageComponentList();
			setMainPageComponenetsListArr(response);
		})();
		
		
		
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategoryListArr(response);
		})();
		
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
				<Table route={"component/mainpage"} columns={ComponentListTableColumn} data={mainPageComponenetsListArr}/>
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
