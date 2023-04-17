import React from "react";
import styles from '../components/Category/CategoryManipulate.module.css'

const Category = () => {
	return(
		<div className={styles.container}>
			<text className={styles.title}>
				카테고리 관리
			</text>
			
			<div className={styles.body}>
				<div className={styles.categoryAddComponent}>
					<input className={styles.categoryNameInput}/>
					<button className={styles.categoryAddBtn}>
						추가
					</button>
				</div>
				
				<div className={styles.categoryListComponent}>
					<div className={styles.categoryListElement}>
						<input type={"radio"}/>
						<div className={styles.categoryListElementText}> 카테고리 제목 </div>
						<div className={styles.categoryListElementText}> 등록된 상품 수 </div>
						<div className={styles.categoryListElementText}> 100 </div>
					</div>
				</div>
			</div>
		
		</div>
	)
}

export default Category;
