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

const RegisterAd = () => {
	
	const editorRef = useRef<Editor>(null);
	
	const [title, setTitle] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [adType, setAdType] = useState<string>("ad1");
	const [category, setCategory] = useState<string>("아이돌봄 여행")
	const [parsedHTML, setParsedHTML] = useState<string>("");
	
	
	const [pcBanner, setPcBanner] = useState("");
	const pcBannerRef = useRef<HTMLInputElement | null>(null);
	
	const [mobileBanner, setMobileBanner] = useState("");
	const mobileBannerRef = useRef<HTMLInputElement | null>(null);
	
	const [pcBannerLink, setPcBannerLink] = useState("");
	const [mobileBannerLink, setMobileBannerLink] = useState("");
	
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
	
	const saveImgFile = (ref: any, setBanner: any) => {
		
		if (ref != null) {
			// @ts-ignore
			const file = ref.current.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				// @ts-ignore
				setBanner(reader.result);
			}
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
			startDate: startDate,
			endDate: endDate,
			adType: adType,
			adCategory: category,
			adContent: parsedHTML,
			createdAd: "daw916@naver.com"
		})
			.then(() => {
				window.confirm("등록되었습니다.");
				window.history.back();
			})
			.catch(e => console.log(e))
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
								dateFormat={"yyyy-MM-dd"}
								locale="ko"
								selected={startDate}
								onChange={(e) => setStartDate(e || startDate)}
							/>
						</div>
						~
						<div>
							<DatePicker
								className={styles.showDatePickerBtn}
								dateFormat={"yyyy-MM-dd"}
								locale="ko"
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
						onChange={() => saveImgFile(pcBannerRef, setPcBanner)}
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
						onChange={() => saveImgFile(mobileBannerRef, setMobileBanner)}
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
						   onChange={e => setPcBannerLink(e.target.value)}
					/>
				</p>
				
				<p className={styles.p}>
					<strong>카테고리</strong>
					<div className={styles.radioContainer}>
						<input type="radio"
							   name="Children"
							   value="아이돌봄 여행"
							   checked={category == "아이돌봄 여행"}
							   id="Children"
							   style={{marginRight: 10}}
							   onChange={radioCategoryTypeHandler}
						/>
						<div
							style={{marginRight: 10}}
						> 아이돌봄 여행
						</div>
						
						<input type="radio"
							   name="TheOld"
							   value="어르신돌봄 여행"
							   checked={category == "어르신돌봄 여행"}
							   id="TheOld"
							   style={{marginRight: 10}}
							   onChange={radioCategoryTypeHandler}
						/>
						<div
							style={{marginRight: 10}}
						> 어르신 돌봄 여행
						</div>
						
						<input type="radio"
							   name="Concierge"
							   value="컨시어지 여행"
							   checked={category == "컨시어지 여행"}
							   id="Concierge"
							   style={{marginRight: 10}}
							   onChange={radioCategoryTypeHandler}
						/>
						<div
							style={{marginRight: 10}}> 컨시어지 여행
						</div>
						
						<input type="radio"
							   name="OnLan"
							   value="랜선 여행"
							   checked={category == "랜선 여행"}
							   id="OnLan"
							   style={{marginRight: 10}}
							   onChange={radioCategoryTypeHandler}
						/>
						<div style={{marginRight: 10}}> 랜선 여행</div>
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
					<button className={styles.button}>
						등록하기
					</button>
				</div>
			</div>
		</div>
	)
}

export default RegisterAd;
