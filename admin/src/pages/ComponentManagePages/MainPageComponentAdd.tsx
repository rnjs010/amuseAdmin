import React, {useEffect, useRef, useState} from "react";

import styles from '../../components/ComponentManage/ComponentManage.module.css'

import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";
import {Editor} from "@toast-ui/react-editor";
import {CategoryLogic} from "../../logics/CategoryLogic";
import {ItemLogic} from "../../logics/ItemLogic";
import {ComponentManageLogic} from "../../logics/ComponentManageLogic";

type ProductItem = {
	id: number
	title: string
	categoryNames: string[]
	createdAt: string
	createdBy: string
	updatedAt: string
	updatedBy: string
}

const MainPageComponentAdd = () => {
	
	const [category, setCategory] = useState<string[]>([]);
	const [component, setComponent] = useState<string>("")
	const [componentType, setComponentType] = useState<string>("리스트");
	
	const [productListArr, setProductListArr] = useState<any>([]);
	
	const [selected, setSelected] = useState<any[]>([]);
	
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
	
	const componentSubmit = async () => {
		
		if (componentType == "리스트") {
			const response = await ComponentManageLogic.postComponent({
				title: component,
				type: "리스트",
				createBy: "daw916@naver.com",
				sequence: 3,
				itemCode: selected
			})
			console.log(response)
			return;
		}
		
		
		if (componentType == "배너") {
			const response = await ComponentManageLogic.postComponent({
				title: component,
				type: "배너",
				createBy: "daw916@naver.com",
				sequence: 3,
				pcBannerFileName: pcBannerFileName,
				pcBannerBase64: pcBanner,
				pcBannerLink: pcBannerLink,
				mobileBannerFileName: mobileBannerFileName,
				mobileBannerBase64: mobileBanner,
				mobileBannerLink: mobileBannerLink,
				content: parsedHTML,
			})
			console.log(response)
			return;
		}
	};
	
	useEffect(() => {
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategory(response.map((v: any) => (v.displayHashTag)));
		})();
		
		(async () => {
			const response = await ItemLogic.getProductItems({
				"option": 1,
				"page": 0,
				"limit": 100,
				"categoryNames": category
			})
			setProductListArr(response);
		})();
		
		
	}, [])
	
	useEffect(() => {
	
	}, [componentType]);
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				
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
						style={{display: "flex", flexDirection: "row"}}
					>
						<div
							style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10}}
						>
							<input type="radio"
								   checked={componentType == "리스트"}
								   value={"리스트"}
								   id={"List"}
								   onChange={radioComponentTypeHandler}
							/>
							<div> 리스트</div>
						</div>
						
						<div
							style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10}}
						>
							<input type="radio"
								   checked={componentType == "배너"}
								   value={"배너"}
								   id={"Banner"}
								   onChange={radioComponentTypeHandler}/>
							<div> 배너</div>
						</div>
						
						<div
							style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10}}
						>
							<input type="radio"
								   checked={componentType == "타일"}
								   value={"타일"}
								   id={"Tile"}
								   onChange={radioComponentTypeHandler}/>
							<div> 타일</div>
						</div>
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
							<SelectableTable
								route={""} columns={ProductTableColumns} data={productListArr}
								setStateValue={setSelected} value={selected}
							/>
						</div>
					) : ("")
				}
				
				{
					(componentType == "배너") ? (
						<div>
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>배너 제목</strong>
								</div>
								
								<input className={styles.textInput}
									   type="text"
									   name="adName"
									   placeholder="등록할 광고의 이름을 입력해주세요."
									   onChange={(e) => setBannerTitle(e.target.value)}
								/>
							</p>
							
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
							타일 개수 3개로 가정한 것
							n 개의 타일 개수 입력받아서 아래 형식 n개로 나타낼 예정
							테이블마다 검색기능 필요
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
									route={""} columns={ProductTableColumns} data={productListArr}
									setStateValue={setSelected} value={selected}
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
									route={""} columns={ProductTableColumns} data={productListArr}
									setStateValue={setSelected} value={selected}
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
									route={""} columns={ProductTableColumns} data={productListArr}
									setStateValue={setSelected} value={selected}
								/>
							</p>
						
						
						</div>
					) : ("")
				}
				
				<div
					style={{marginBottom: 10}}
				>
					<button className={styles.button}
							onClick={componentSubmit}
					>
						등록하기
					</button>
				</div>
			
			</div>
		
		</div>
	)
	
}

export default MainPageComponentAdd
