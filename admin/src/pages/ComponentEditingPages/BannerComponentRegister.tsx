import React, {useRef, useState} from "react";
import styles from '../../components/ComponentEditing/component.module.css'
import "./ComponentStyle/BannerComponentRegister.scss";
import {Editor} from "@toast-ui/react-editor";

import Swal from "sweetalert2";
import axios from "axios";

const BannerComponentRegister = () => {
	const [title, setTitle] = useState<string>("")
	const [bannerTitle, setBannerTitle] = useState<string>("");

	/**
	 * Register API
	 
	const handleRegister = () => {
		// 등록할 데이터를 정리합니다.
	
		setItemCode(selected.map((select) => select.product_code));
		
		const postData = {
		  "title": title,
		  "type": "리스트",
		  "createdBy": "daw916@naver.com",
		  "itemCode": itemCode,
		};
	  
		// POST 요청을 보냅니다.
		axios
		  .post("https://ammuse.store/test/api/component/register/list", postData, {
			headers: {
			  Authorization: process.env.REACT_APP_COMPONENT_API_KEY,
			},
		  })
		  .then((response) => {
			Swal.fire({
				icon: "success",
				title: "리스트 컴포넌트 생성",
				confirmButtonText: "확인",
				confirmButtonColor: "#F184A1"
			});
			console.log(response)
		  })
		  .catch((error) => {
			Swal.fire({
				icon: "error",
				title: "리스트 컴포넌트 생성 오류",
				confirmButtonText: "확인",
				confirmButtonColor: "#F184A1"
			});
			console.log("등록 실패");
		  });
	  };

	  */
	
	///////
	const pcBannerRef = useRef<HTMLInputElement | null>(null);
	const [pcBannerUrl, setPcBannerUrl] = useState<string>("");
	const [pcBanner, setPcBanner] = useState("");
	const [pcBannerLink, setPcBannerLink] = useState("");
	const [pcBannerFileName, setPcBannerFileName] = useState("");
	
	const mobileBannerRef = useRef<HTMLInputElement | null>(null);
	const [mobileBannerUrl, setMobileBannerUrl] = useState<string>("");
	const [mobileBanner, setMobileBanner] = useState("");
	const [mobileBannerLink, setMobileBannerLink] = useState("");
	const [mobileBannerFileName, setMobileBannerFileName] = useState("");
	
	const [parsedHTML, setParsedHTML] = useState<string>("");
	const parsedHTMLRef = useRef<Editor>(null);
	
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
	
	//


	return (
		<div className="BannerComponentRegister">
			<div className={styles.body}>
				<div className="component-list-title">📍 배너 컴포넌트 생성</div>

				<div className="component-name">
					<p className={styles.p}>
						<div className={styles.pTitle}>컴포넌트 이름</div>
					</p>
					<input
						className="component-name-input"
						type="text"
						name="componentTitle"
						placeholder="컴포넌트 이름을 입력하세요"
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				
				<div className="banner-name">
					<p className={styles.p}>
						<div className={styles.pTitle}>배너 제목</div>
					</p>
					<input className="banner-name-input"
						type="text"
						name="adName"
						placeholder="등록할 배너의 제목을 입력해주세요."
						onChange={(e) => setBannerTitle(e.target.value)}
					/>
				</div>
				
				{/* */}
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
				
				</p>
				
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
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>모바일 배너 링크</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="mobileBannerLink"
						   onChange={e => setMobileBannerLink(e.target.value)}
						   value={mobileBannerLink}
					/>
				</p>
				
				<p className={styles.p}>
					<strong>배너 내용</strong>
					<div
						style={{marginTop: 20}}
					>
						<Editor
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
				{/* */}

				{/*			
				<div className="component-make">
					<button className="component-button" onClick={handleRegister}>등록 하기</button>
				</div>
				*/}

			</div>
		</div>
	)
}

export default BannerComponentRegister;

