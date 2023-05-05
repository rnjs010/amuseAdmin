import React from "react";
import styles from '../../components/Notice/Notice.module.css'
import Table from "../../components/Table/Table";
import {NoticeTableColumns} from "../../components/Table/NoticeTableColumns";

const Notice = () => {
	
	return (
		<div className={styles.container}>
			<h2 className={styles.title}> 공지사항 </h2>
			
			
			<div
				style={{marginLeft: '5%', width: '90%'}}
			>
				<Table
					root={'notice'}
					columns={NoticeTableColumns}
					data={
						[
							{
								id: 1,
								title: "테스트",
								createdAdDate: "테스트",
								createdAd: "테스트",
								updatedAdDate: "테스트",
								updatedAd: "테스트"
							}
						]
					}/>
			</div>
		
		</div>
	)
	
}

export default Notice;
