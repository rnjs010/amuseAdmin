import React, {useEffect, useState, useMemo} from "react";
import styles from '../../components/Ad/Ad.module.css'
import {Link, useNavigate} from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

import Table from "../../components/Table/Table";
import {AdTableColumns} from "../../components/Table/AdTableColumns";
import {AdApiLogic} from "../../logics/AdLogic";

type AdInfo = {
	id: Number | null;
	title: String | null;
	startDate: Date | null;
	endDate: Date | null;
	adCategory: Array<String> | null;
	createdAt: Date | null;
	createdBy: String | null;
	updatedAt: Date | null;
	updatedBy: String | null;
};

const Ad = () => {
	
	const navigate = useNavigate();
	
	const todayDate = new Date();
	const [startDate, setStartDate] = useState<Date>(todayDate);
	const [endDate, setEndDate] = useState<Date>(todayDate);
	
	const [adListArr, setAdListArr] = useState<AdInfo[]>([]);
	
	const [offset, setOffset] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	
	const [pageCount, setPageCount] = useState<number>(1);
	
	
	useEffect(() => {
		(async () => {
			const response = await AdApiLogic.getAdArr(offset, limit, page);
			setAdListArr(response.data)
			setPageCount(response.pageCount)
		})();
	}, [])
	
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
				<h2> 광고 관리 </h2>
				<button className={styles.button}
						onClick={() => navigate('/ad/register')}
				>
					등록하기
				</button>
			</div>
			<div style={{paddingTop: 30}}>
				<Table route={'ad'} columns={AdTableColumns} data={adListArr}/>
			</div>
		</div>
	)
}

export default Ad;
