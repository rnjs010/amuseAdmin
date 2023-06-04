import React, {useEffect, useState} from "react";
import styles from '../../components/ComponentEditing/component.module.css'

import DropDown from "../../components/DropDown";
import {ItemLogic} from "../../logics/ItemLogic";
import {CategoryLogic} from "../../logics/CategoryLogic";
import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";

const ListComponentRegister = () => {
	
	const [title, setTitle] = useState<string>("")
	
	const [category, setCategory] = useState<string[]>([]);
	const [productListArr, setProductListArr] = useState<any>([]);
	
	const [selected, setSelected] = useState<any[]>([]);
	
	useEffect(() => {
		
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategory(response.map((v: any) => (v.displayHashTag)));
		})();
		
		(async () => {
			const response = await ItemLogic.getProductItems({
				"option": 1,
				"page": 1,
				"limit": 100,
				"categoryNames": category
			})
			setProductListArr(response);
		})();
		
	}, [])
	
	
	return (
		<div className={styles.container}>
			<div
				className={styles.body}
			>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>컴포넌트 명</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="componentTitle"
						   placeholder="컴포넌트 이름을 입력하세요"
						   onChange={(e) => setTitle(e.target.value)}
					/>
				</p>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>상품목록</strong>
					</div>
				</p>
			
				
				<SelectableTable
								route={""} columns={ProductTableColumns} data={productListArr}
								setStateValue={setSelected} value={selected}
				/>
			</div>
		
		</div>
	
	
	)
}

export default ListComponentRegister;
