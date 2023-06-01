import React, {useEffect, useRef, useState, ChangeEvent, Dispatch, SetStateAction} from "react";

import styles from '../components/ComponentManage/ComponentManage.module.css'

interface Props {
	option: string;
	setOption: Dispatch<SetStateAction<string>>;
}


const DropDown = ({option, setOption}: Props) => {
	
	
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const onToggle = () => setIsOpen(!isOpen);
	
	const onOptionClicked = (value: string, index: number) => () => {
		setOption(value)
		setIsOpen(false);
	};
	
	return (
		<div className={styles.dropdownContainer}>
			<div className={styles.dropdownHeader} onClick={onToggle}>
				<p>{option} ▼</p>
			</div>
			<div
			>
				<ul>
					{isOpen && (
						<>
							<li className={styles.li} onClick={onOptionClicked("상품코드", 1)}>상품코드 검색</li>
							<li className={styles.li} onClick={onOptionClicked("카테고리", 2)}>카테고리 검색</li>
							<li className={styles.li} onClick={onOptionClicked("제목", 3)}>제목 검색</li>
							<li className={styles.li} onClick={onOptionClicked("내용", 4)}>내용 검색</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default DropDown;
