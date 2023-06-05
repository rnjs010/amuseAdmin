import React, {useEffect, useState} from "react";
import Table from "../../components/Table/Table";
import styles from '../../components/ComponentEditing/component.module.css'

import {useNavigate} from "react-router-dom";
import {ComponentLogic} from "../../logics/ComponentLogic";

// To Extract
// API 확정되면, Extract
const ComponentTableColumns = [
	{
		Header: 'ID',
		accessor: 'id'
	},
	{
		Header: '컴포넌트',
		accessor: 'title'
	},
	{
		Header: '타입',
		accessor: 'type'
	},
	{
		Header: '등록일',
		accessor: 'createAt'
	},
	{
		Header: '등록자',
		accessor: 'createBy'
	},
	{
		Header: '수정일',
		accessor: 'updateAt'
	},
	{
		Header: '수정자',
		accessor: 'updateBy'
	},
];

const Component = () => {
	
	const navigate = useNavigate();
	
	const [componentListArr, setComponentListArr] = useState<any>([]);
	
	useEffect(() => {
		
		(async () => {
			const response  = await ComponentLogic.getComponentList();
			setComponentListArr(response);
		})()
		
	}, []);
	
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2> 컴포넌트 관리 </h2>
				
				<div>
					<button className={styles.button}
							onClick={() => navigate("/componentv2/listcomponent/register")}
					>
						리스트
					</button>
					
					<button className={styles.button}
							onClick={() => navigate("/componentv2/bannercomponent/register")}
					>
						배너
					</button>
					
					<button className={styles.button}
							onClick={() => navigate("/componentv2/tilecomponent/register")}
					>
						타일
					</button>
				</div>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={"componentv2"} columns={ComponentTableColumns} data={componentListArr}/>
			</div>
		
		</div>
	)
}

export default Component
