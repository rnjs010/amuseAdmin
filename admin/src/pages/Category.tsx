import React from "react";
import styles from '../components/Category/CategoryManipulate.module.css'

import Table from "../components/Table/Table";
import {CategoryTableColumns} from "../components/Table/CategoryTableColumns";

const Category = () => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>
				카테고리 관리
			</h2>
			
			<div className={styles.body}>
				<div className={styles.categoryAddComponent}>
					<input className={styles.categoryNameInput}/>
					<button className={styles.categoryAddBtn}>
						추가
					</button>
				</div>
			
			</div>
			<div style={{marginLeft: '5%', width: '90%'}}>
				<Table
					columns={CategoryTableColumns}
					data={[]}
				/>
			</div>
		
		</div>
	)
}

export default Category;
