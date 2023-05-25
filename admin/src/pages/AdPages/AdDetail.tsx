import React, {useEffect, useRef, useState} from "react";
import styles from '../../components/Ad/AdRegister.module.css'

import {useParams} from "react-router-dom";
import axios from "axios";

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import ToastEditor from "../../components/ToastEditor";
import DatePicker from 'react-datepicker';
import {AdLogic} from "../../logics/AdLogic";
import {CategoryLogic} from "../../logics/CategoryLogic";
import {ImageAttachLogic} from "../../logics/ImageFileAttachLogic";

const AdDetail = () => {
	
	const {id} = useParams()
	
	const editorRef = useRef<Editor>(null);
	
	const [title, setTitle] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [parsedHTML, setParsedHTML] = useState<string>("");
	const parsedHTMLRef = useRef<Editor>(null);
	const [pcBannerFileName, setPcBannerFileName] = useState("");
	const [pcBanner, setPcBanner] = useState("");
	const pcBannerRef = useRef<HTMLInputElement | null>(null);
	const [pcBannerUrl, setPcBannerUrl] = useState<string>("");
	const [mobileBannerFileName, setMobileBannerFileName] = useState("");
	const [mobileBanner, setMobileBanner] = useState("");
	const mobileBannerRef = useRef<HTMLInputElement | null>(null);
	const [mobileBannerUrl, setMobileBannerUrl] = useState<string>("");
	const [pcBannerLink, setPcBannerLink] = useState("");
	const [mobileBannerLink, setMobileBannerLink] = useState("");
	
	const [category, setCategory] = useState<string[]>([]);
	const [selectedCategoryArr, setSelectedCategoryArr] = useState<string[]>([]);
	
	const handleCategory = (category: string) => {
		if (selectedCategoryArr.some((v) => v == category)) {
			setSelectedCategoryArr(selectedCategoryArr.filter(v => v !== category));
			return;
		}
		setSelectedCategoryArr([...selectedCategoryArr, category]);
	}
	
	useEffect(() => {
		(async () => {
			// @ts-ignore
			const response = await AdLogic.getAdDetail(id);
			setTitle(response.title)
			setStartDate(new Date(response.startDate))
			setEndDate(new Date(response.endDate))
			setParsedHTML(response.adContent)
			parsedHTMLRef?.current?.getInstance().setHTML(response.adContent);
			
			setPcBannerUrl(response.pcBannerUrl)
			setPcBannerLink(response.pcBannerLink)
			
			setMobileBannerUrl(response.mobileBannerUrl)
			setMobileBannerLink(response.mobileBannerLink)
			
			setSelectedCategoryArr(response.adCategory)
		})();
	}, [])
	
	
	useEffect(() => {
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			const categoryArr = response.map((v: any) => v.displayHashTag);
			setCategory(categoryArr);
		})()
	}, [])
	
	useEffect(() => {
		// @ts-ignore
		const regex = /<img.*?src="(.*?)"/g
		const found = parsedHTML.match(regex);
	}, [parsedHTML])
	
	const editAd = async () => {
		
		if (title == "") {
			window.confirm("제목을 다시 확인해주세요");
			return;
		}
		
		if (startDate == null || endDate == null) {
			window.confirm("날짜를 다시 확인해주세요");
			return;
		}
		
		await AdLogic.updateAdDetail({
			id: id,
			title: title,
			startDate: startDate.toISOString().split("T")[0],
			endDate: endDate.toISOString().split("T")[0],
			pcBannerFileName: pcBannerFileName,
			pcBannerBase64: pcBanner,
			pcBannerLink: pcBannerLink,
			mobileBannerFileName: mobileBannerFileName,
			mobileBannerBase64: mobileBanner,
			mobileBannerLink: mobileBannerLink,
			adCategory: selectedCategoryArr,
			adContent: parsedHTML,
			updatedBy: "daw564@naver.com",
		}).then(() => {
			window.confirm("수정되었습니다.");
			window.history.back();
		}).catch(e => window.confirm(e));
	}
	
	
	const clicked = {
		padding: "5px 5px",
		border: "1px solid #eb1749",
		borderRadius: "10px",
		background: "#eb1749",
		color: "#fff",
	}
	
	const notClicked = {
		padding: "5px 5px",
		border: "1px solid #eb1749",
		borderRadius: "10px",
		background: "",
	}
	
	const saveImgFile = (ref: any, setBannerFileName: any, setBanner: any,) => {
		try {
			if (ref != null) {
				// @ts-ignore
				setBannerFileName(ref.current.files[0].name);
				const file = ref.current.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					console.log(reader.result)
					setBanner(reader.result);
				}
			}
		} catch {
		
		}
	};
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>광고 제목</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="adName"
						   placeholder="등록할 광고의 이름을 입력해주세요."
						   value={title}
						   onChange={e => setTitle(e.target.value)}
					/>
				</p>
				
				<div className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>광고 기간</strong>
					</div>
					
					<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}
					>
						<div>
							<DatePicker
								className={styles.showDatePickerBtn}
								dateFormat="yyyy-MM-dd"
								selected={startDate}
								onChange={(e) => setStartDate(e || startDate)}
							/>
						
						</div>
						~
						<div>
							<DatePicker
								className={styles.showDatePickerBtn}
								dateFormat={"yyyy-MM-dd"}
								selected={endDate}
								onChange={(e) => setEndDate(e || endDate)}
							/>
						</div>
					
					</div>
				</div>
				
				
				<p className={styles.p}>
					<strong>PC 배너</strong>
					<input
						type="file"
						accept="image/*"
						id="pcBanner"
						onChange={() => saveImgFile(pcBannerRef, setPcBannerFileName, setPcBanner)}
						ref={pcBannerRef}
					/>
				</p>
				
				<p className={styles.p}>
					{
						(pcBannerUrl) ? (
							<img
								src={pcBannerUrl}
								width={200}
								alt="pcBannerUrl"
							/>
						) : (
							(
								pcBanner
							) ? (
								<img
									src={pcBanner}
									width={200}
									alt="pcBanner"
								/>
							) : (
								""
							)
						)
					}
				</p>
				
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>PC 배너 링크</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="pcBannerLink"
						   placeholder="PC 배너의 링크를 입력해주세요."
						   onChange={e => setPcBannerLink(e.target.value)}
						   value={pcBannerLink}
					/>
				</p>
				
				<p className={styles.p}>
					<strong>모바일 배너</strong>
					<input
						type="file"
						accept="image/*"
						id="mobileBanner"
						onChange={() => saveImgFile(mobileBannerRef, setMobileBannerFileName, setMobileBanner)}
						ref={mobileBannerRef}
					/>
					
					<p className={styles.p}>
						{
						(mobileBannerUrl) ? (
							<img
								src={mobileBannerUrl}
								width={200}
								alt="mobileBannerUrl"
							/>
						) : (
							(
								mobileBanner
							) ? (
								<img
									src={mobileBanner}
									width={200}
									alt="mobileBanner"
								/>
							) : (
								""
							)
						)
					}
					</p>
				</p>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>모바일 배너 링크</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="mobileBannerLink"
						   placeholder="모바일 배너의 링크를 입력해주세요."
						   onChange={e => setMobileBannerLink(e.target.value)}
						   value={mobileBannerLink}
					/>
				</p>
				
				<p className={styles.p}>
					<div
						style={{
							display: "flex",
							flexDirection: "row"
						}}
					>
						<strong>카테고리</strong>
						(
						<div> {selectedCategoryArr.length} 개 선택</div>
						)
					</div>
					
					<div className={styles.categoryList}>
						{
							category.map((v, i) => (
								<div
									style={{
										marginRight: 5,
										marginBottom: 5
									}}
									key={i}
								>
									<button
										style={
											(
												selectedCategoryArr.includes(v)
											) ? (
													clicked
												)
												: (
													notClicked
												)
										}
										onClick={() => handleCategory(v)}
									>
										{v}
									</button>
								</div>
							))
						}
					</div>
				</p>
				
				<p className={styles.p}>
					<strong>광고 내용</strong>
					<div
						style={{marginTop: 20}}
					>
						<Editor
							ref={parsedHTMLRef}
							placeholder={parsedHTML}
							previewStyle="tab"
							initialEditType="markdown"
							hideModeSwitch={true}
							height="500px"
							toolbarItems={[
								// 툴바 옵션 설정
								['heading', 'bold', 'italic', 'strike'],
								['hr', 'quote'],
								['ul', 'ol', 'task', 'indent', 'outdent'],
								['table', 'image', 'link'],
								['code', 'codeblock']
							]}
							customHTMLRenderer={{
								// 구글 맵 삽입을 위한
								// iframe 태그 커스텀 코드
								htmlBlock: {
									iframe(node: any) {
										return [
											{
												type: 'openTag',
												tagName: 'iframe',
												outerNewLine: true,
												attributes: node.attrs
											},
											{type: 'html', content: node.childrenHTML},
											{type: 'closeTag', tagName: 'iframe', outerNewLine: true}
										];
									}
								}
							}}
							onChange={() => {
								try {
									// @ts-ignore
									setParsedHTML(parsedHTMLRef.current?.getInstance().getHTML());
								} catch (error) {
									console.log(error)
								}
							}}
							hooks={{
								addImageBlobHook: async (blob, callback) => {
									console.log(blob);
								}
							}}
						></Editor>
					</div>
				</p>
				
				<div
					className={styles.p}
				>
					<button className={styles.button}
							onClick={editAd}
					>
						수정하기
					</button>
				</div>
			</div>
		</div>
	)
	
}

export default AdDetail;
