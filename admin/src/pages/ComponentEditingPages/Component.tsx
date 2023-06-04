import React from "react";
import Table from "../../components/Table/Table";
import styles from '../../components/ComponentEditing/component.module.css'

import {useNavigate} from "react-router-dom";

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
		Header: '등록일',
		accessor: 'createdAt'
	},
	{
		Header: '등록자',
		accessor: 'createdBy'
	},
	{
		Header: '수정일',
		accessor: 'updatedAt'
	},
	{
		Header: '수정자',
		accessor: 'updatedBy'
	},
];

const Component = () => {
	
	const navigate = useNavigate();
	
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
				<Table route={""} columns={ComponentTableColumns} data={[]}/>
			</div>
		
		</div>
	)
}

export default Component
