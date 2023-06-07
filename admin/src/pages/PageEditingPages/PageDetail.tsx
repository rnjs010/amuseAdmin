import React, {useEffect, useRef, useState} from "react";

import styles from "../../components/PageEditing/page.module.css"

import {useParams} from "react-router-dom";
import {PageLogic} from "../../logics/PageLogic";
import {ComponentLogic} from "../../logics/ComponentLogic";

const PageDetail = () => {
	
	const {id} = useParams();
	
	const [name, setName] = useState<string>("");
	const [sequence, setSequence] = useState<number>(0);
	const [categoryImage, setCategoryImage] = useState("");
	const [categoryImageFileName, setCategoryImageFileName] = useState("");
	
	const categoryImageRef = useRef<HTMLInputElement | null>(null);
	const [mainDescription, setMainDescription] = useState<string>("")
	const [subDescription, setSubDescription] = useState<string>("")
	
	const [pageComponent, setPageComponent] = useState<any>([]);
	
	useEffect(() => {
		(async () => {
			const response = await PageLogic.getPageDetail(id);
			setName(response.name);
			setSequence(response.sequence);
			setCategoryImage(response.imgUrl);
			setMainDescription(response.mainDescription);
			setSubDescription(response.subDescription);
			
			const pageComponentInfos = response.pageComponentInfos;
			console.log(pageComponentInfos)
			
			pageComponentInfos.map((v: any) => {
				
				(async () => {
					const response = await ComponentLogic.getComponentDetail(v.id);
					// setPageComponent([...pageComponent, response]);
					console.log(response)
				})()
			});
			
			console.log(response)
		})()
	}, [])
	
	const saveImgFile = () => {
		
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
	};
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>페이지</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="pageName"
						   value={name}
						   placeholder="페이지 이름을 입력하세요"
						   onChange={(e) => setName(e.target.value)}
					/>
				</p>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>배치 순서</strong>
					</div>
					
					<div
						style={{display: "flex", flexDirection: "row", alignItems: "center"}}
					>
						<input className={styles.textInput}
							   type="number"
							   name="sequence"
							   value={sequence}
							   placeholder="배치 순서를 입력하세요"
						/>
						
						<button
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: 30,
								height: 30,
								border: "1px solid"
							}}
							onClick={() => setSequence(sequence + 1)}
						>
							<div>
								+
							</div>
						</button>
						
						<button
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: 30,
								height: 30,
								border: "1px solid"
							}}
							onClick={() => setSequence(sequence - 1)}
						>
							<div>
								-
							</div>
						</button>
					</div>
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
								alt="categoryImage"
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
								value={mainDescription}
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
				
				{
					JSON.stringify(pageComponent, null, 4)
				}
			</div>
		</div>
	)
	
	
}

export default PageDetail;
