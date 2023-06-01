import React from "react";
import Table from "../../components/Table/Table";
import styles from '../../components/ComponentEditing/component.module.css'


// To Extract
const ComponentTableColumns = [
	{
		Header: 'ID',
		accessor: 'id'
	},
	{
		Header: '상품명',
		accessor: 'title'
	},
	{
		Header: '상품 코드',
		accessor: 'code'
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
		accessor: 'updatedAdDate'
	},
	{
		Header: '수정자',
		accessor: 'updatedAd'
	},
];

const Component = () => {
	
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
				<h2> 컴포넌트 관리 </h2>
				
				<button className={styles.button}
						onClick={() => console.log("추가하기")}
				>
					추가하기
				</button>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={""} columns={ComponentTableColumns} data={[]}/>
			</div>
			
		</div>
	)
}

export default Component
