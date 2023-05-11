import React, {useEffect, useState, useMemo} from "react";
import styles from '../../components/Ad/Ad.module.css'
import {Link, useNavigate} from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

import Table from "../../components/Table/Table";
import {AdTableColumns} from "../../components/Table/AdTableColumns";

type AdInfo = {
	id: Number | null;
	title: String | null;
	startDate: Date | null;
	endDate: Date | null;
	adType: String | null;
	adCategory: String | null;
	adContent: String | null;
	createdAdDate: Date | null;
	createdAd: String | null;
	updatedAdDate: Date | null;
	updatedAd: String | null;
};

const Ad = () => {
	
	const navigate = useNavigate();
	
	const todayDate = new Date();
	const [startDate, setStartDate] = useState<Date>(todayDate);
	const [endDate, setEndDate] = useState<Date>(todayDate);
	
	const [adListArr, setAdListArr] = useState<AdInfo[]>([]);
	
	useEffect(() => {
		(async () => {
			// await axios.get(`${process.env.REACT_APP_API_URL}/test/api/ad/getList`)
			await axios.get(`https://ammuse.store/test/api/ad/getList`)
				.then(r => setAdListArr(r.data.data))
				.catch(e => console.log(e))
		})();
		console.log(adListArr)
	}, [])
	
	useEffect(() => {
		
		if (startDate > endDate) {
			window.confirm("시작 날짜를 확인해주세요");
			setStartDate(todayDate);
			setEndDate(todayDate);
		}
	}, [startDate, endDate])
	
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
				
				<button
					className={styles.button}
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
