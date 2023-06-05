import React, {useEffect} from "react";

import Table from "../../components/Table/Table";
import styles from "../../components/PageEditing/page.module.css"
import {PageLogic} from "../../logics/PageLogic";

// To Extract
// API 확정되면, Extract
const PageTableColumns = [
	{
		Header: 'ID',
		accessor: 'id'
	},
	{
		Header: '페이지',
		accessor: 'title'
	},
	{
		Header: "배치 순서",
		accessor: "sequence"
	},
	{
		Header: "비활성화",
		accessor: "disabled"
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

const Page = () => {
	
	useEffect(() => {
		
		(async () => {
			const response = await PageLogic.getPageList();
			console.log(response)
		})()
		
	}, [])
	
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2> 페이지 관리 </h2>
			</div>
			
			<div style={{paddingTop: 30}}>
				<Table route={"page"}
					   columns={PageTableColumns}
					   data={[
						   {
							   id: 1,
							   title: "메인페이지"
						   },
						   {
							   id: 2,
							   title: "컨시어지"
						   },
						   {
							   id: 3,
							   title: "아이돌봄"
						   },
					   ]}
				/>
			</div>
		</div>
	)
}

export default Page;
