import React, {useState, useEffect, useRef} from "react";
import styles from '../../components/Category/CategoryRegister.module.css'

import axios from "axios";
import ToastEditor from "../../components/ToastEditor";
import category from "./Category";
import {Editor} from "@toast-ui/react-editor";

const CategoryRegister = () => {
	
	const [categoryTitle, setCategoryTitle] = useState("");
	
	const [categoryImage, setCategoryImage] = useState("");
	const [categoryImageFileName, setCategoryImageFileName] = useState("");
	const categoryImageRef = useRef<HTMLInputElement | null>(null);
	
	const [mainDescription, setMainDescription] = useState<string>("")
	const [subDescription, setSubDescription] = useState<string>("")
	
	// const mainDescriptionRef = useRef<Editor>(null);
	// const subDescriptionRef = useRef<Editor>(null);
	
	const saveImgFile = () => {
		try {
			if (categoryImageRef != null) {
				// @ts-ignore
				const file = categoryImageRef.current.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					// @ts-ignore
					setCategoryImage(reader.result);
					setCategoryImageFileName(file.name)
				}
			}
		} catch {
		
		}
		
		
	};
	
	const registerCategory = () => {
		(async () => {
			await axios.post("https://ammuse.store/test/api/category/register", {
				category: categoryTitle,
				fileName: categoryImageFileName,
				base64Data: categoryImage,
				mainDescription: mainDescription,
				subDescription: subDescription,
				createdBy: "daw916@naver.com"
			})
				.then(() => {
					window.confirm("등록되었습니다.");
					window.history.back();
				})
				.catch(e => console.log(e))
		})()
	}
	
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<form>
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>카테고리</strong>
						</div>
						
						<input className={styles.textInput}
							   type="text"
							   name="categoryName"
							   placeholder="추가할 카테고리 이름을 입력해주세요."
							   onChange={e => setCategoryTitle(e.target.value)}
						/>
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>대표 이미지</strong>
						</div>
						<input
							type="file"
							accept="image/*"
							id="categoryImage"
							onChange={saveImgFile}
							ref={categoryImageRef}
						/>
					
					</p>
					
					<p className={styles.p}>
						{
							(!categoryImage) ? (
								""
							) : (
								<img
									src={categoryImage}
									width={200}
									alt="프로필 이미지"
								/>
							)
						}
					</p>
					
					<p className={styles.p}>
						
						<div
							className={styles.pTitle}>
							<strong>대표 설명</strong>
						
						</div>
						<div>
							<textarea
								style={{
									border: "1px solid"
								}}
								value={subDescription}
								onChange={(e) => setMainDescription(e.target.value)}
							>
							</textarea>
						
						</div>
					</p>
					
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>부가 설명</strong>
						</div>
						<div>
							<textarea
								style={{
									border: "1px solid"
								}}
								value={subDescription}
								onChange={(e) => setSubDescription(e.target.value)}
							>
							</textarea>
						</div>
					</p>
				</form>
				
				<div className={styles.p}>
					<button className={styles.button}
							onClick={registerCategory}
					>
						등록하기
					</button>
				</div>
			</div>
		
		
		</div>
	
	)
	
}

export default CategoryRegister;
