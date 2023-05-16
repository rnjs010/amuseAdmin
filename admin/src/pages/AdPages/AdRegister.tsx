import React, {useEffect, useRef, useState} from "react";

import styles from '../../components/Ad/AdRegister.module.css'

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import DatePicker from 'react-datepicker';
import axios from "axios";
import ToastEditor from "../../components/ToastEditor";

// TODO: dayjs
function getToday(date: Date) {
	const year = date.getFullYear();
	const month = ("0" + (1 + date.getMonth())).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);
	return year + "-" + month + "-" + day;
}


const Categories = [
	"아이돌봄 여행",
	"컨시어지 여행",
	"산",
	"캠핑",
]


const AdRegister = () => {
	
	const editorRef = useRef<Editor>(null);
	
	const [title, setTitle] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [adType, setAdType] = useState<string>("ad1");
	const [category, setCategory] = useState<string>("아이돌봄 여행")
	const [parsedHTML, setParsedHTML] = useState<string>("");
	
	const [pcBannerFileName, setPcBannerFileName] = useState("");
	const [pcBanner, setPcBanner] = useState("");
	const pcBannerRef = useRef<HTMLInputElement | null>(null);
	
	const [mobileBannerFileName, setMobileBannerFileName] = useState("");
	const [mobileBanner, setMobileBanner] = useState("");
	const mobileBannerRef = useRef<HTMLInputElement | null>(null);
	
	const [pcBannerLink, setPcBannerLink] = useState("");
	const [mobileBannerLink, setMobileBannerLink] = useState("");
	
	const [selectedCategoryArr, setSelectedCategoryArr] = useState<string[]>([]);
	
	const handleCategory = (category: string) => {
		if (selectedCategoryArr.some((v) => v == category)) {
			setSelectedCategoryArr(selectedCategoryArr.filter(v => v !== category));
			console.log(selectedCategoryArr)
			return
		}
		setSelectedCategoryArr([...selectedCategoryArr, category])
		console.log(selectedCategoryArr)
	}
	
	
	useEffect(() => {
		console.log(editorRef);
	}, [editorRef])
	
	// TODO: TO Discuss
	useEffect(() => {
		// @ts-ignore
		const regex = /<img.*?src="(.*?)"/g
		const found = parsedHTML.match(regex);
		// console.log("found is")
		// console.log(found)
	}, [parsedHTML])
	
	const radioAdTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAdType(event.target.value);
	};
	
	const radioCategoryTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value);
	};
	
	const saveImgFile = (ref: any, setBannerFileName: any, setBanner: any,) => {
		
		
		try {
			if (ref != null) {
				// @ts-ignore
				setBannerFileName(ref.current.files[0].name);
				const file = ref.current.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					setBanner(reader.result);
				}
			}
		} catch {
		
		}
		
		
	};
	
	
	const registerAd = async () => {
		
		if (title == "") {
			window.confirm("제목을 다시 확인해주세요");
			return;
		}
		
		if (startDate == null || endDate == null) {
			window.confirm("날짜를 다시 확인해주세요");
			return;
		}
		
		await axios.post(`https://ammuse.store/test/api/ad/register`, {
			title: title,
			startDate: startDate.toISOString().split("T")[0],
			endDate: endDate.toISOString().split("T")[0],
			pcBannerFileName: pcBannerFileName,
			pcBannerBase64: window.btoa(pcBanner),
			pcBannerLink: pcBannerLink,
			mobileBannerFileName: mobileBannerFileName,
			mobileBannerBase64: window.btoa(mobileBanner),
			mobileBannerLink: mobileBannerLink,
			adCategory: selectedCategoryArr,
			adContent: parsedHTML,
			createdBy: "daw916@naver.com",
		})
			.then(() => {
				window.confirm("등록되었습니다.");
				window.history.back();
			})
			.catch(e => window.confirm(e))
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
						(!pcBanner) ? (
							""
						) : (
							<img
								src={pcBanner}
								width={200}
								alt="프로필 이미지"
							/>
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
							(!mobileBanner) ? (
								""
							) : (
								<img
									src={mobileBanner}
									width={200}
									alt="프로필 이미지"
								/>
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
							Categories.map((v, i) => (
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
						<ToastEditor setStateValue={setParsedHTML} value={parsedHTML}/>
					</div>
				</p>
				
				<div
					className={styles.p}
				>
					<button className={styles.button}
							onClick={registerAd}
					>
						등록하기
					</button>
				</div>
			</div>
		</div>
	)
}


export default AdRegister;
