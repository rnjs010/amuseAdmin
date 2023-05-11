import React, {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import styles from '../../components/Notice/NoticeDetail.module.css'
import ToastEditor from "../../components/ToastEditor";

{/*<ToastEditor*/
}

{/*></ToastEditor>*/
}

const NoticeDetail = () => {
	
	const {id} = useParams();
	
	const navigate = useNavigate();
	
	const onClickRoute = (id: number) => {
		navigate(`/staff/${id}`);
	};
	
	const [noticeContent, setNoticeContent] = useState<string>("");
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<form>
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
							   name="categoryName"
							   placeholder="수정할 제목을 입력해주세요"
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
							<ToastEditor setStateValue={setNoticeContent} value={noticeContent}/>
						</div>
					</p>
					
					<div
						className={styles.p}
					>
						<button className={styles.button}>
							수정하기
						</button>
					</div>
				</form>
			</div>
		</div>
	
	
	)
	
}

export default NoticeDetail;
