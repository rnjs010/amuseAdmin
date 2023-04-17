import React from "react";
import styles from '../components/Ad/AdRegister.module.css'

const RegisterAd = () => {
	
	return(
		<div className={styles.container}>
			<text className={styles.title}>
				광고 관리
			</text>
			
			<div className={styles.body}>
				<div className={styles.searchComponent}>
					<div
						style={{display:"flex", flexDirection: "row", justifyContent: "space-between"}}
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
						<button className={styles.showDatePickerBtn}></button>
						
						<div className={styles.dateLabel}>
							종료일
						</div>
						<button className={styles.showDatePickerBtn}></button>
					</div>
				</div>
				
				<div className={styles.adListComponent}>
					<div className={styles.adListElement}>
						<div
							style={{marginRight: 10}}
						>
							<input
								type="radio"
								color="#eb1749"
								checked={false}
							
							/>
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

export default RegisterAd;
