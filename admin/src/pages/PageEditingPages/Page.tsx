import React, {useEffect, useState} from "react";

import Table from "../../components/Table/Table";
import styles from "../../components/PageEditing/page.module.css"
import {PageLogic} from "../../logics/PageLogic";
import {PageTableColumns} from "../../components/Table/PageTableColumns";


const Page = () => {
	
	const [pageListArr, setPageListArr] = useState<any>([]);
	
	useEffect(() => {
		
		(async () => {
			const response = await PageLogic.getPageList();
			setPageListArr(response);
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
					   data={pageListArr}
				/>
			</div>
		</div>
	)
}

export default Page;
