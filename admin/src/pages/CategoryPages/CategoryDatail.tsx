import React, {useState, useRef, useEffect} from "react";
import styles from '../../components/Category/CategoryDetail.module.css'


import {useParams, useNavigate} from "react-router-dom";
import ToastEditor from "../../components/ToastEditor";
import {Editor} from "@toast-ui/react-editor";
import axios from "axios";
import Table from "../../components/Table/Table";
import {CategoryProductTableColumns} from "../../components/Table/CategoryProductTableColumns";


const CategoryDetail = () => {
	
	const {id} = useParams();
	const navigate = useNavigate();
	
	const [categoryTitle, setCategoryTitle] = useState("");
	const [categoryImage, setCategoryImage] = useState("");
	const [categoryImageFileName, setCategoryImageFileName] = useState("");
	
	const categoryImageRef = useRef<HTMLInputElement | null>(null);
	const [mainDescription, setMainDescription] = useState<string>("")
	const [subDescription, setSubDescription] = useState<string>("")
	
	const mainDescriptionRef = useRef<Editor>(null);
	const subDescriptionRef = useRef<Editor>(null);
	
	useEffect(() => {
		
		(async () => {
			await axios.get(`https://ammuse.store/test/api/category/${id}`)
				// .then(r => setProductListArr(r.data.data.data))
				.then(r => {
					const res = r.data.data
					setCategoryTitle(res.hashTag)
					setCategoryImage(res.imgUrl)
					const mainDescriptionRefInit = mainDescriptionRef?.current?.getInstance().setHTML(res.mainDescription);
					const subDescriptionRefInit = subDescriptionRef?.current?.getInstance().setHTML(res.subDescription);
					setMainDescription(res.mainDescription)
					setSubDescription(res.subDescription)
					console.log(res)
				})
				.catch(e => console.log(e))
		})();
	}, [])
	
	
	const saveImgFile = () => {
		
		if (categoryImageRef != null) {
			// @ts-ignore
			const file = categoryImageRef.current.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				// @ts-ignore
				setCategoryImage(reader.result);
				setCategoryImageFileName(file.name)
			}
		}
	};
	
	
	const editCategory = () => {
		
		(async () => {
			await axios.post('https://ammuse.store/test/api/category/edit', {
				id: id,
				category: categoryTitle,
				fileName: categoryImageFileName,
				base64Data: categoryImage,
				mainDescription: mainDescription,
				subDescription: subDescription,
				updatedBy: "daw564@naver.com"
			})
				.then(() => {
					console.log(categoryTitle)
					window.confirm("수정되었습니다.")
					window.history.back();
					
				})
				.catch(e => console.log(e))
		})();
		
		
	}
	
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div>
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>카테고리</strong>
						</div>
						
						<input className={styles.textInput}
							   type="text"
							   name="categoryName"
							   placeholder={categoryTitle}
							   onChange={e => setCategoryTitle(e.target.value)}
						/>
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>대표 이미지</strong>
						</div>
						<input
							type="file"
							accept="image/*"
							id="categoryImage"
							onChange={saveImgFile}
							ref={categoryImageRef}
						/>
					
					</p>
					
					<p className={styles.p}>
						{
							(!categoryImage) ? (
								""
							) : (
								<img
									src={categoryImage}
									width={200}
									alt="프로필 이미지"
								/>
							)
						}
					</p>
					
					<p className={styles.p}>
						
						<div
							className={styles.pTitle}>
							<strong>대표 설명</strong>
						
						</div>
						<div>
							<Editor
								ref={mainDescriptionRef}
								placeholder="내용을 입력하세요"
								previewStyle="tab"
								initialEditType="markdown"
								initialValue={mainDescription || ' '}
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
										setMainDescription(mainDescriptionRef.current?.getInstance().getHTML());
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
					
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>부가 설명</strong>
						</div>
						<div>
							<Editor
								ref={subDescriptionRef}
								placeholder="내용을 입력하세요"
								previewStyle="tab"
								initialEditType="markdown"
								initialValue={subDescription || ' '}
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
										setSubDescription(subDescriptionRef.current?.getInstance().getHTML());
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
				<div
					className={styles.p}
				>
					<button className={styles.button}
							onClick={editCategory}
					>
						수정하기
					</button>
				</div>
			</div>
		</div>
	
	)
	
}

export default CategoryDetail;
