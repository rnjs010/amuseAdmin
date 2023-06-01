import React, {useEffect, useState} from "react";
import styles from '../../components/ComponentEditing/component.module.css'

import DropDown from "../../components/DropDown";

const ListComponentRegister = () => {
	
	const [searchOption, setSearchOption] = useState<string>("검색조건");
	
	useEffect(() => {
		console.log(searchOption)
	}, [searchOption])
	
	return (
		<div className={styles.container}>
			<div>
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>상품목록</strong>
					</div>
				</p>
				
				<div
					style={{display: "flex", flexDirection: "row", marginBottom: 30}}
				>
					<DropDown
						option={searchOption}
						setOption={setSearchOption}
					/>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<input
							className={styles.searchTextInput}
							placeholder={"검색어를 입력하세요"}
						/>
					</form>
					
				</div>

			</div>
		</div>
	
	
	)
}

export default ListComponentRegister;
