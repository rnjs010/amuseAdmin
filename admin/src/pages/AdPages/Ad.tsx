import React, {useEffect, useState} from "react";
import styles from '../../components/Ad/Ad.module.css'
import {Link} from "react-router-dom";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Ad = () => {
	
	const todayDate = new Date();
	const [startDate, setStartDate] = useState<Date>(todayDate);
	const [endDate, setEndDate] = useState<Date>(todayDate);
	
	useEffect(() => {
		if(startDate > endDate) {
			window.confirm("Invalid");
			setStartDate(todayDate);
			setEndDate(todayDate);
		}
	}, [startDate, endDate])
	
	return (
		<div className={styles.container}>
			<text className={styles.title}>
				광고 관리
			</text>
			
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
						
						// TODO
						<div className={styles.dateLabel}>
							시작일
						</div>
						
						<DatePicker
							className={styles.showDatePickerBtn}
							onChange={(e) => setStartDate(e || startDate)}
						>
							<div>
								 {String(startDate)}
							</div>
						</DatePicker>
						
						// TODO
						<div className={styles.dateLabel}>
							종료일 {String(endDate)}
						</div>
						<DatePicker
							className={styles.showDatePickerBtn}
							onChange={(e) => setEndDate(e || startDate)}
						/>
						
					</div>
				</div>
				
				<div style={{position: "relative", top: 20, left: "35%", flexDirection: "row", display: "flex"}}>
					<Link to={'/ad/edit'} className={styles.linkBtn}> 수정 </Link>
					<Link to={'/'} className={styles.linkBtn}> 신규등록 </Link>
				</div>
				
				
				<div className={styles.adListComponent}>
					<div className={styles.adListElement}>
						<div
							style={{marginRight: 10}}
						>
							<input type="radio" className={styles.adListElementRadio}/>
						</div>
						<div className={styles.adListElementImage}></div>
						<div
							style={{display: "flex", justifyContent: "center", width: "10%"}}
						>
							광고 제목
						</div>
						<div
							style={{display: "flex", justifyContent: "center", width: "50%"}}
						>
							광고 내용
						</div>
						<div
							style={{display: "flex", justifyContent: "center", width: "20%"}}
						>
							'22.03.01. ~ '23.02.01.
						</div>
						<div
							style={{display: "flex", justifyContent: "center", width: "10%"}}
						>
							광고 종료
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Ad;
