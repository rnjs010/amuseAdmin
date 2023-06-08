import React, {useEffect, useState} from "react";

import Table from "../../components/Table/Table";

import {useNavigate} from "react-router-dom";

import styles from "../../components/PageEditing/page.module.css"
import {PageLogic} from "../../logics/PageLogic";
import {PageTableColumns} from "../../components/Table/PageTableColumns";


const Page = () => {
	
	const navigate = useNavigate();
	
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
				<button className={styles.button}
							onClick={() => navigate("/page/register")}
					>
						등록하기
					</button>
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
