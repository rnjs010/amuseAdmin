import React, {useEffect, useState} from "react";
import styles from '../../components/ComponentEditing/component.module.css'

import {ItemLogic} from "../../logics/ItemLogic";
import {CategoryLogic} from "../../logics/CategoryLogic";
import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";
import {useParams} from "react-router-dom";
import {ComponentLogic} from "../../logics/ComponentLogic";
import TestSelectableTable from "../../components/Table/TestSelectableTable";


const ListComponentDatail = () => {
	
	const {id} = useParams();
	
	const [title, setTitle] = useState<string>("")
	
	const [category, setCategory] = useState<string[]>([]);
	const [productListArr, setProductListArr] = useState<any>([]);
	
	const [selected, setSelected] = useState<any[]>([]);
	
	useEffect(() => {
		
		(async () => {
			if (id != null) {
				const response = await ComponentLogic.getComponentDetail(id);
				// console.log(response.productList)
				const productList = response.productList
				const itemCodeArr = productList.map((v: any) => v.itemCode)
				setSelected(itemCodeArr);
			}
		})();
		
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
			<div className={styles.body}>
				{id}
				<p className={styles.p}>
					<div className={styles.pTitle}>
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
					<div className={styles.pTitle}>
						<strong>상품목록</strong>
					</div>
				</p>
				
				<TestSelectableTable
					route={""} columns={ProductTableColumns} data={productListArr}
					setStateValue={setSelected} value={selected} id={id ?? ""}
				/>
			</div>
		
		</div>
	
	
	)
}

export default ListComponentDatail;
