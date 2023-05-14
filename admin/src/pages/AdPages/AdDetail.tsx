import React, {useEffect, useRef, useState} from "react";
import styles from '../../components/Ad/AdEdit.module.css'

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import {useParams} from "react-router-dom";


const AdDetail = () => {
	
	const {id} = useParams()
	
	const editorRef = useRef<Editor>(null);
	
	const [parsedHTML, setParsedHTML] = useState<string>("");
	
	const [adType, setAdType] = useState<string>("Ad");
	const [category, setCategory] = useState<string>("Children")
	
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
		setCategory("Banner");
	};
	
	const radioCategoryTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(event.target.value);
	};
	
	const editAd = () => window.confirm(`${adType} ${category}`);
	
	return (
		<div className={styles.container}>
			
			<div>
				{id}
			</div>
			<text className={styles.title}>
				광고 수정
			</text>
			
			<div className={styles.body}>
				<div className={styles.adEditorContainer}>
					
					<div className={styles.adEditorContainerElement}>
						광고제목
						<input className={styles.adEditorContainerAdTitleInput}/>
					</div>
					
					<div className={styles.adEditorContainerElement}>
						광고 기간
						<button className={styles.showDatePickerBtn}/>
						~
						<button className={styles.showDatePickerBtn}/>
					</div>
					
					<div className={styles.adEditorContainerElement}>
							광고 유형
						<div className={styles.radioContainer}>
						<input type="radio"
							   name="Ad"
							   value="Ad"
							   checked={adType == "Ad"}
							   id="Ad"
							   style={{marginRight: 10}}
							   onChange={radioAdTypeHandler}
						/>
						<div style={{marginRight: 10}}>
							일반 광고
						</div>
						
						<input type="radio"
							   name="Banner"
							   value="Banner"
							   checked={adType == "Banner"}
							   id="Banner"
							   style={{marginRight: 10}}
							   onChange={radioAdTypeHandler}
						/>
						<div style={{marginRight: 10}}>
							배너 광고
						</div>
					</div>
					</div>
					
					{
						(
							adType == "Banner"
						) ? (
							<div className={styles.adEditorContainerElement}>
								광고 이미지
								<button className={styles.submitImageBtn}>
									첨부하기
								</button>
							</div>
						) : (
							<>
								<div className={styles.adEditorContainerElement}>
									카테고리
								<div className={styles.radioContainer}>
									<input type="radio"
										   name="Children"
										   value="Children"
										   checked={category == "Children"}
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
										   value="TheOld"
										   checked={category == "TheOld"}
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
										   value="Concierge"
										   checked={category == "Concierge"}
										   id="Concierge"
										   style={{marginRight: 10}}
										   onChange={radioCategoryTypeHandler}
									/>
									<div
										style={{marginRight: 10}}> 컨시어지 여행
									</div>
									
									<input type="radio"
										   name="OnLan"
										   value="OnLan"
										   checked={category == "OnLan"}
										   id="OnLan"
										   style={{marginRight: 10}}
										   onChange={radioCategoryTypeHandler}
									/>
									<div style={{marginRight: 10}}> 랜선 여행</div>
								</div>
								</div>
								<div className={styles.adEditorContainerElement}>
									광고 내용
								</div>
								
								<Editor
									ref={editorRef}
									placeholder="내용을 입력해주세요."
									previewStyle="tab"
									initialEditType="markdown"
									// TODO
									// Wysiwyg mode width error
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
											// TODO: TO Discuss
											// setParsedHTML(editorRef.current?.getInstance().getHTML());
											console.log(parsedHTML)
											
										} catch (error) {
											console.log(error)
										}
									}}
									hooks={{
										addImageBlobHook: async (blob, callback) => {
											
											console.log(blob);
											
											// 1. 첨부된 이미지 파일 S3에 저장
											//	const imgUrl = await ....
											
											// 2. S3에 저장된 이미지 경로 Url 받음
											// 3. 반환된 이미지 경로 Url 경로를 Callback으로 넣어준다.
											// callback("imgUrl", "Alt Text")
											// callback("https://i.namu.wiki/i/JmEHtLbAQdW1xKBdD-YaeRIHZTGeB4es55y9qfK5OftrXlmieyK1t8-nRrLC58l45c-_RELd1YY9Fchx5HzhboS1OuSs7p2Q63b_wPr7u_XGODu-Se_JeYzuJRvNOzzvvzMelUnC65Mrmyqi21D1vQ.webp", "강아지")
											
											// 이미지 첨부 후 base 64로 에디터에 나오는 것이 아닌
											// 서버에 저장 후 저장된 경로를 자동으로 받아와서
											// 에디터에 자동으로 <img src="blahblah..." /> 로 변환된다.
										}
									}}
								></Editor>
								
							</>
						)
					}
				</div>
			</div>
			
			<button
				title={"등록하기"}
				style={{width: 100, height: 100, background: 'red'}}
				onClick={editAd}
			>
			
			</button>
		</div>
	)
	
}

export default AdDetail;
