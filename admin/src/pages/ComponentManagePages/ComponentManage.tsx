import React from "react";

import styles from '../../components/ComponentManage/ComponentManage.module.css'

const ComponentManage = () => {
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
				<h2> 메인페이지 관리 </h2>
				
				<button className={styles.button}>
					추가하기
				</button>
			</div>
			
			<div className={styles.body}>
				<div>실시간 Best 여행 상품🏞</div>
				<div>어뮤즈의 최신 여행 패키지🚙</div>
				<div>전해드릴 소식이 있어요📢</div>
				<div>지역 별 여행 상품📍</div>
				<div>어뮤즈트래블에 대해 더 알고싶다면? 🔍</div>
			</div>
			
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
				<h2> 카테고리별 관리 </h2>
			</div>
			
			<div className={styles.body}>
				<div>컨시어지</div>
				<div>아이돌봄</div>
				<div>캠핑</div>
				<div>산</div>
			</div>
		</div>
	)
}

export default ComponentManage
