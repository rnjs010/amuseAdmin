import React, {useEffect, useState, useMemo} from "react";
import styles from '../../components/Ad/Ad.module.css'
import {Link} from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

import Table from "../../components/Table/Table";

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
	
	const todayDate = new Date();
	const [startDate, setStartDate] = useState<Date>(todayDate);
	const [endDate, setEndDate] = useState<Date>(todayDate);
	
	const [adListArr, setAdListArr] = useState<AdInfo[]>([]);
	
	useEffect(() => {
		(async () => {
			await axios.get(`${process.env.REACT_APP_API_URL}/test/api/ad/getList`)
				.then(r => setAdListArr(r.data.data))
				.catch(e => console.log(e))
		})();
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
			<h2 className={styles.title}>
				광고 관리
			</h2>
			<div className={styles.body}>
				<div className={styles.searchComponent}>
					<div
						style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}
					>
						<input className={styles.searchBar}/>
						
						<button className={styles.searchBtn}
								onClick={() => console.log("123123")}
						>
							검색
						</button>
					</div>
					<div className={styles.adList}>
						
						<div className={styles.dateLabel}>
							시작일
						</div>
						
						<DatePicker
							className={styles.showDatePickerBtn}
							selected={startDate}
							onChange={(e) => setStartDate(e || startDate)}
						>
						</DatePicker>
						
						<div className={styles.dateLabel}>
							종료일
						</div>
						<DatePicker
							className={styles.showDatePickerBtn}
							selected={endDate}
							onChange={(e) => setEndDate(e || startDate)}
						/>
					</div>
				</div>
				
				<div style={{position: "relative", top: 20, left: "35%", flexDirection: "row", display: "flex"}}>
					<Link to={'/ad/edit'} className={styles.linkBtn}> 수정 </Link>
					<Link to={'/ad/register'} className={styles.linkBtn}> 신규등록 </Link>
				</div>
				
				<div className={styles.adListComponent}>
					<Table data = {adListArr}></Table>
				</div>
			</div>
		</div>
	)
}

export default Ad;
