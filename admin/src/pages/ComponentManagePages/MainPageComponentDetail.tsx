import React, {useState, useRef, useEffect} from "react";
import styles from '../../components/ComponentManage/ComponentManage.module.css'

import {useParams, useNavigate} from "react-router-dom";

import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";
import {CategoryLogic} from "../../logics/CategoryLogic";
import {ItemLogic} from "../../logics/ItemLogic";

import {Editor} from "@toast-ui/react-editor";
import {ComponentManageLogic} from "../../logics/ComponentManageLogic";


const MainPageComponentDetail = () => {
	
	const {id} = useParams();
	const navigate = useNavigate();
	
	const [category, setCategory] = useState<string[]>([]);
	const [component, setComponent] = useState<string>("")
	const [componentType, setComponentType] = useState<string>("리스트");
	
	const [productListArr, setProductListArr] = useState<any>([]);
	
	const [bannerTitle, setBannerTitle] = useState<string>("");
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
	
	const [selected, setSelected] = useState<any[]>([]);
	
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
	
	const radioComponentTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComponentType(event.target.value);
	};
	
	useEffect(() => {
		
		(async () => {
			const response = await ComponentManageLogic.getMainPageComponentDetail(id);
			console.log(response)
			setComponent(response.title)
			setComponentType(response.type)
			setProductListArr(response.itemCode)
			
			setPcBannerUrl(response.pcBannerImgUrl)
			setMobileBannerUrl(response.mobileBannerImgUrl)
		})();
		
		
	}, [])
	
	useEffect(() => {
		console.log(selected)
	}, [selected]);
	
	return (
		<div className={styles.container}>
			
			<div className={styles.body}>
				
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>ID: {id}</strong>
					</div>
				</p>
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>컴포넌트 명</strong>
					</div>
					
					<input className={styles.textInput}
						   type="text"
						   name="componentName"
						   placeholder="컴포넌트 이름을 입력하세요"
						   value={component}
						   onChange={(e) => setComponent(e.target.value)}
					/>
				</p>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>타입</strong>
					</div>
					<div
						className={styles.pTitle}
					>
						{componentType}
					</div>
				
				</p>
				
				{
					(componentType == "리스트") ? (
						<div>
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>상품목록</strong>
								</div>
							
							
							</p>
							{
								productListArr.map((v: any, i: any) => (
									<p className={styles.p} key={i}>
										상품코드: {v}
									</p>
								))
							}
						</div>
					) : ("")
				}
				
				{
					(componentType == "배너") ? (
						<div>
							{/*<p className={styles.p}>*/}
							{/*	<div*/}
							{/*		className={styles.pTitle}*/}
							{/*	>*/}
							{/*		<strong>배너 제목</strong>*/}
							{/*	</div>*/}
							{/*	*/}
							{/*	<input className={styles.textInput}*/}
							{/*		   type="text"*/}
							{/*		   name="adName"*/}
							{/*		   placeholder="등록할 광고의 이름을 입력해주세요."*/}
							{/*		   onChange={(e) => setBannerTitle(e.target.value)}*/}
							{/*	/>*/}
							{/*</p>*/}
							
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
						</div>
					) : ("")
				}
				
				{
					(componentType == "타일") ? (
						<div>
							{/*타일 개수 3개로 가정한 것*/}
							{/*n 개의 타일 개수 입력받아서 아래 형식 n개로 나타낼 예정*/}
							{/*테이블마다 검색기능 필요*/}
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>타일명</strong>
								</div>
								
								<input className={styles.textInput}
									   type="text"
									   name="tileName"
									   placeholder="타일 이름을 입력하세요"
								/>
								
								<p className={styles.p}>
									<strong>타일 사진 추가</strong>
									<input
										type="file"
										accept="image/*"
									/>
								
								</p>
								
								
								<p className={styles.p}>
									<strong>상품 목록</strong>
								</p>
								<SelectableTable
									route={""} columns={ProductTableColumns} data={[
									{
										id: 1,
										product: "[2박 3일] 김에 바다의 역사에 대해서 알아볼까요?",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 2,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 3,
										product: "[3박 4일] 청춘 가득한 제주 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 4,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									}]}
									setStateValue={setSelected}
									value={selected}
								/>
							</p>
							
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>타일명</strong>
								</div>
								
								<input className={styles.textInput}
									   type="text"
									   name="tileName"
									   placeholder="타일 이름을 입력하세요"
								/>
								
								<p className={styles.p}>
									<strong>타일 사진 추가</strong>
									<input
										type="file"
										accept="image/*"
									/>
								
								</p>
								
								
								<p className={styles.p}>
									<strong>상품 목록</strong>
								</p>
								<SelectableTable
									route={""} columns={ProductTableColumns} data={[
									{
										id: 1,
										product: "[2박 3일] 김에 바다의 역사에 대해서 알아볼까요?",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 2,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 3,
										product: "[3박 4일] 청춘 가득한 제주 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 4,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									}]}
									setStateValue={setSelected}
									value={selected}
								/>
							</p>
							
							
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>타일명</strong>
								</div>
								
								<input className={styles.textInput}
									   type="text"
									   name="tileName"
									   placeholder="타일 이름을 입력하세요"
								/>
								
								<p className={styles.p}>
									<strong>타일 사진 추가</strong>
									<input
										type="file"
										accept="image/*"
									/>
								
								</p>
								
								<p className={styles.p}>
									<strong>상품 목록</strong>
								</p>
								
								<SelectableTable
									route={""} columns={ProductTableColumns} data={[
									{
										id: 1,
										product: "[2박 3일] 김에 바다의 역사에 대해서 알아볼까요?",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 2,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 3,
										product: "[3박 4일] 청춘 가득한 제주 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									},
									{
										id: 4,
										product: "[2박 3일] 낭만 가득한 여수 여행",
										createdAt: "2023-05-17T17:30:47.55265",
										createdBy: "daw916@naver.com",
									}]}
									setStateValue={setSelected}
									value={selected}
								/>
							</p>
						
						
						</div>
					) : ("")
				}
				
				<div
					style={{marginBottom: 10}}
				>
					<button className={styles.button}
					>
						등록하기
					</button>
				</div>
			
			</div>
		
		</div>
	)
	
}

export default MainPageComponentDetail;
