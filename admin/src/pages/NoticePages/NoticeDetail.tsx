import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import styles from '../../components/Notice/NoticeDetail.module.css'
import ToastEditor from "../../components/ToastEditor";
import axios from "axios";
import {Editor} from "@toast-ui/react-editor";

const NoticeDetail = () => {
	
	const {id} = useParams();
	
	const navigate = useNavigate();
	
	const [title, setTitle] = useState<string>("")
	const [content, setContent] = useState<string>("")
	const contentRef = useRef<Editor>(null)
	
	const onClickRoute = (id: number) => {
		navigate(`/staff/${id}`);
	};
	
	const editNotice =  () => {
		(async () => {
			await axios.post('https://ammuse.store/test/api/notice/edit', {
				id: id,
				title: title,
				updatedBy: "daw916@naver.com",
				content: content
			})
				.then(() => {
					window.confirm("등록되었습니다.");
					window.history.back();
				})
				.catch(e => window.confirm(e))
		})()
	}
	
	useEffect(() => {
		(async () => {
			await axios.get(`https://ammuse.store/test/api/notice/${id}`)
				.then((r) => {
					const res = r.data.data
					setTitle(res.title);
					setContent(res.content)
					const contentRefInit = contentRef?.current?.getInstance().setHTML(res.content);
				})
		})()
	}, [])
	
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div
					onSubmit={() => console.log("onSubmit")}
				>
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>ID</strong>
						</div>
						
						<div className={styles.pTitle}>
							<strong>{id}</strong>
						</div>
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>제목</strong>
						
						</div>
						<input className={styles.textInput}
							   type="text"
							   name="noticeTitle"
							   value={title}
							   onChange={(e) => setTitle(e.target.value)}
						/>
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 등록일자 </strong>
						</div>
						2023-05-01
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 등록자 </strong>
						</div>
						Admin1
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 수정일자 </strong>
						</div>
						2023-05-01
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 수정자 </strong>
						</div>
						Admin2
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 공지사항 내용 </strong>
						</div>
						
						<div>
							<Editor
								ref={contentRef}
								placeholder={content}
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
										setContent(contentRef.current?.getInstance().getHTML());
										console.log(content)
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
					
					<div
						className={styles.p}
					>
						<button className={styles.button}
								onClick={editNotice}
							// onClick={() => console.log(content)}
						>
							수정하기
						</button>
					</div>
				</div>
			</div>
		</div>
	
	
	)
	
}

export default NoticeDetail;
