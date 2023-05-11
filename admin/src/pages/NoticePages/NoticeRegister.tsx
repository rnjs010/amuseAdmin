import React, {useState} from "react";
import styles from '../../components/Notice/NoticeRegister.module.css'
import ToastEditor from "../../components/ToastEditor";

const NoticeRegister = () => {
	
	const [noticeContent, setNoticeContent] = useState<string>("");
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<form>
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>제목</strong>
						
						</div>
						<input className={styles.textInput}
							   type="text"
							   name="categoryName"
							   placeholder="공지사항 제목을 입력해주세요"
						/>
					</p>
					
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong> 공지사항 내용 </strong>
						</div>
						
						<div>
							<ToastEditor setStateValue={setNoticeContent} value={noticeContent}/>
						</div>
					</p>
					
					<div
						className={styles.p}
					>
						<button className={styles.button}>
							등록하기
						</button>
					</div>
				</form>
			</div>
		</div>
	
	
	)
}

export default NoticeRegister;
