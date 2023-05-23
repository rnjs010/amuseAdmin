import React, {useState} from "react";

import styles from '../../components/ComponentManage/ComponentManage.module.css'

import SelectableTable from "../../components/Table/SelectableTable";
import Table from "../../components/Table/Table";
import {ProductTable} from "../../components/Table/ProductTable";
import {Editor} from "@toast-ui/react-editor";
import DatePicker from "react-datepicker";

const MainPageComponentAdd = () => {
	
	const [componentType, setComponentType] = useState<string>("List");
	
	const radioComponentTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setComponentType(event.target.value);
	};
	
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
								   checked={componentType == "List"}
								   value={"List"}
								   id={"List"}
								   onChange={radioComponentTypeHandler}
							
							/>
							<div> 리스트</div>
						</div>
						
						<div
							style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10}}
						>
							<input type="radio"
								   checked={componentType == "Banner"}
								   value={"Banner"}
								   id={"Banner"}
								   onChange={radioComponentTypeHandler}/>
							<div> 배너</div>
						</div>
						
						<div
							style={{display: "flex", flexDirection: "row", alignItems: "center", marginRight: 10}}
						>
							<input type="radio"
								   checked={componentType == "Tile"}
								   value={"Tile"}
								   id={"Tile"}
								   onChange={radioComponentTypeHandler}/>
							<div> 타일</div>
						</div>
					</div>
				</p>
				
				{
					(componentType == "List") ? (
						<div>
							<p className={styles.p}>
								<div
									className={styles.pTitle}
								>
									<strong>싱품목록</strong>
								</div>
							
							
							</p>
							<SelectableTable
								route={""} columns={ProductTable} data={[
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
							/>
						</div>
					) : ("")
				}
				
				{
					(componentType == "Banner") ? (
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
								/>
							</p>
							
							<p className={styles.p}>
								<strong>PC 배너</strong>
								<input
									type="file"
									accept="image/*"
									id="pcBanner"
								/>
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
								/>
							</p>
							
							<p className={styles.p}>
								<strong>모바일 배너</strong>
								<input
									type="file"
									accept="image/*"
									id="mobileBanner"
								/>
							
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
					(componentType == "Tile") ? (
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
									route={""} columns={ProductTable} data={[
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
									route={""} columns={ProductTable} data={[
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
									route={""} columns={ProductTable} data={[
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

export default MainPageComponentAdd
