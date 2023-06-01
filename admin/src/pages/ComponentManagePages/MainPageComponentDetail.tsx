import React, {useState, useRef, useEffect} from "react";
import styles from '../../components/ComponentManage/ComponentManage.module.css'

import {useParams, useNavigate} from "react-router-dom";

import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";
import {CategoryLogic} from "../../logics/CategoryLogic";
import {ItemLogic} from "../../logics/ItemLogic";

import {Editor} from "@toast-ui/react-editor";
import {ComponentManageLogic} from "../../logics/ComponentManageLogic";
import Table from "../../components/Table/Table";
import {ComponentListSeqTableColumn} from "../../components/Table/ComponentListSeqTableColumn";


interface TileData {
	tileName: string;
	tileFileName: string | null;
	tileBase64: string | null;
	itemCode: number | null;
}

const MainPageComponentDetail = () => {
	
	const {id} = useParams();
	const navigate = useNavigate();
	
	const [category, setCategory] = useState<string[]>([]);
	const [component, setComponent] = useState<string>("")
	const [componentType, setComponentType] = useState<string>("리스트");
	
	const [mainPageComponenetsListArr, setMainPageComponenetsListArr] = useState<any[]>([]);
	const [seq, setSeq] = useState<number>(0);
	
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
	
	const [itemCode, setItemCode] = useState<any[]>([]);
	
	const [tileCount, setTileCount] = useState<number>(1);
	const [tileData, setTileData] = useState<TileData[]>([]); // 타일 데이터 배열
	
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const onToggle = () => setIsOpen(!isOpen);
	const [option, setOption] = useState<string>("검색조건")
	const onOptionClicked = (value: string, index: number) => () => {
		console.log(value);
		setOption(value)
		setIsOpen(false);
	};
	
	const [keyword, setKeyword] = useState<string>("");
	
	const DropDown = () => {
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
	
	const onSubmitSearchKeyword = () => {
		
		if (keyword == "") {
			(async () => {
				const response = await ItemLogic.getProductItems({
					"option": 1,
					"page": 1,
					"limit": 100,
					"categoryNames": category
				})
				setProductListArr(response);
			})();
			return;
		}
		
		if (option == "상품코드") {
			(async () => {
				const response = await ItemLogic.getProductItemsFromItemCode(keyword)
					.then((r) => {
						setProductListArr([{
							id: r.itemCode,
							title: r.title,
							categoryNames: r.category,
							createdAt: "daw916@naver.com",
							createdBy: "2023-05-31"
						}]);
					})
					.catch((e) => window.confirm("해당 제목의 상품이 존재하지 않습니다."))
			})()
			return;
		}
		if (option == "카테고리") {
			(async () => {
				const response = await ItemLogic.getProductItems({
					"option": 1,
					"page": 1,
					"limit": 100,
					"categoryNames": [keyword]
				})
				console.log(response)
				setProductListArr(response);
			})();
			return;
		}
		if (option == "제목") {
			(async () => {
				const response = await ItemLogic.getProductItemsFromTitle(1, keyword)
					.then((r) => {
						setProductListArr([{
							id: r.itemCode,
							title: r.title,
							categoryNames: r.category,
							createdAt: "daw916@naver.com",
							createdBy: "2023-05-31"
						}]);
					})
					.catch((e) => window.confirm("해당 코드와 일치하는 상품이 존재하지 않습니다."))
			})()
			return;
		}
		if (option == "내용") {
			return;
		}
	}
	
	const componentSubmit = async () => {
		
		if (componentType == "리스트") {
			const response = await ComponentManageLogic.postComponent({
				id,
				title: component,
				type: "리스트",
				createBy: "daw916@naver.com",
				sequence: seq,
				itemCode: selected
			})
				.then(() => {
					window.confirm("등록되었습니다.");
					window.history.back();
				})
				.catch(e => window.confirm(e))
			console.log(response)
			return;
		}
		
		
		if (componentType == "배너") {
			const response = await ComponentManageLogic.postComponent({
				id,
				title: component,
				type: "배너",
				createBy: "daw916@naver.com",
				sequence: seq,
				pcBannerFileName: pcBannerFileName,
				pcBannerBase64: pcBanner,
				pcBannerLink: pcBannerLink,
				mobileBannerFileName: mobileBannerFileName,
				mobileBannerBase64: mobileBanner,
				mobileBannerLink: mobileBannerLink,
				content: parsedHTML,
			})
				.then(() => {
					window.confirm("등록되었습니다.");
					window.history.back();
				})
				.catch(e => window.confirm(e))
			console.log(response)
			return;
		}
		
		if (componentType == "타일") {
			const response = await ComponentManageLogic.postComponent({
				id,
				title: component,
				type: "타일",
				createBy: "daw916@naver.com",
				sequence: seq,
				tile: tileData
			})
				.then(() => {
					window.confirm("등록되었습니다.");
					window.history.back();
				})
				.catch(e => window.confirm(e))
			console.log(response)
		}
		
		console.log(JSON.stringify(
			{
				title: component,
				type: "타일",
				createBy: "daw916@naver.com",
				sequence: 3,
				tile: tileData
			}
			, null, 4));
		
	};
	
	useEffect(() => {
		
		(async () => {
			const response = await ComponentManageLogic.getMainPageComponentList();
			console.log(response)
			setMainPageComponenetsListArr(response);
		})();
		
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategory(response.map((v: any) => (v.displayHashTag)));
		})();
		
		(async () => {
			const response = await ItemLogic.getProductItems({
				"option": 1,
				"page": 1,
				"limit": 100,
				"categoryNames": category
			})
			setProductListArr(response);
			
		})();
		
		(async () => {
			const response = await ComponentManageLogic.getMainPageComponentDetail(id);
			console.log(response)
			setComponent(response.title)
			setComponentType(response.type)
			setItemCode(response.itemCode)
			setSeq(response.sequence)
			setPcBannerUrl(response.pcBannerImgUrl)
			setMobileBannerUrl(response.mobileBannerImgUrl)
		})();
	}, [])
	
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
		console.log(selected)
	}, [selected]);
	
	// @ts-ignore
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
				
				<p>
					
					<div
						className={styles.pTitle}
					>
						<strong>컴포넌트 순서 목록</strong>
					</div>
					<div style={{paddingTop: 30}}>
						<Table route={""} columns={ComponentListSeqTableColumn} data={mainPageComponenetsListArr}/>
					</div>
				</p>
				
				<p>
					<div
						className={styles.pTitle}
					>
						<strong>등록할 순서</strong>
					</div>
					
					
					<div
						style={{display: "flex", flexDirection: "row", alignItems: "center"}}
					>
						<input className={styles.textInput}
							   type="number"
							   value={seq}
							   id={"number"}
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
							onClick={() => setSeq(seq + 1)}
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
							onClick={() => setSeq(seq - 1)}
						>
							<div>
								-
							</div>
						</button>
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
							
							<div
								style={{display: "flex", flexDirection: "row", marginBottom: 30}}
							>
								<DropDown/>
								<form
									onSubmit={(e) => {
										e.preventDefault();
										onSubmitSearchKeyword();
									}}
								>
									<input
										className={styles.searchTextInput}
										placeholder={"검색어를 입력하세요"}
										onChange={(e) => setKeyword(e.target.value)}
									/>
								</form>
							
							</div>
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
									route={""} columns={ProductTableColumns} data={[]}
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
							onClick={componentSubmit}
					>
						등록하기
					</button>
				</div>
			
			</div>
		
		</div>
	)
	
}

export default MainPageComponentDetail;
