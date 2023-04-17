import React, {useEffect, useRef, useState} from "react";
import styles from '../../components/Ad/AdEdit.module.css'

import {Editor} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


const EditAd = () => {
	
	const editorRef = useRef<Editor>(null);
	
	const [parsedHTML, setParsedHTML] = useState<string>("");
	
	const EditorOptions = {
	
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
	
	return (
		<div className={styles.container}>
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
						광고 이미지
						<button className={styles.submitImageBtn}>
							첨부하기
						</button>
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
				</div>
			</div>
		</div>
	)
	
}

export default EditAd;
