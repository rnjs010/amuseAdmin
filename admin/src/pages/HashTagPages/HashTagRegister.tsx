import React, {useState, useRef} from "react";
import styles from '../../components/HashTag/HashTag.module.css'
import ToastEditor from "../../components/ToastEditor";

const HashTagRegister = () => {
	
	const [hashTag, setHashTag] = useState("");
	const [image, setImage] = useState("");
	const imageRef = useRef<HTMLInputElement | null>(null);
	const [mainDescription, setMainDescription] = useState<string>("")
	const [subDescription, setSubDescription] = useState<string>("")
	
	const saveImgFile = () => {
		
		if (imageRef != null) {
			// @ts-ignore
			const file = categoryImageRef.current.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				// @ts-ignore
				setCategoryImage(reader.result);
			}
		}
	};
	
	const clearImgFile = () => {
		setImage("")
	}
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
					}}
				>
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>해시태그</strong>
						</div>
						
						<input className={styles.textInput}
							   type="text"
							   name="hashTag"
							   placeholder="추가할 해시태그를 입력해주세요."
							   onChange={e => setHashTag(e.target.value)}
						/>
					</p>
					
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>대표 이미지</strong>
						</div>
						<input
							type="file"
							accept="image/*"
							id="categoryImage"
							onChange={saveImgFile}
							ref={imageRef}
						/>
					</p>
					
					<p className={styles.p}>
						{
							(!image) ? (
								""
							) : (
								<div>
									
									<button
										style={{
											position: "absolute",
											background: "red"
											
										}}
										onClick={clearImgFile}
									>
										x
									</button>
									<img
										src={image}
										width={200}
										alt="프로필 이미지"
									>
									</img>
								</div>
							)
						}
					</p>
					
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>대표 설명</strong>
						</div>
						<div>
							<ToastEditor
								value={mainDescription}
								setStateValue={setMainDescription}
							/>
						</div>
					</p>
					
					<p className={styles.p}>
						<div className={styles.pTitle}>
							<strong>부가 설명</strong>
						</div>
						<div>
							<ToastEditor
								value={subDescription}
								setStateValue={setSubDescription}
							/>
						</div>
					</p>
				</form>
				
				<div className={styles.p}>
					<button className={styles.button}>
						등록하기
					</button>
				</div>
			</div>
		</div>
	)
}


export default HashTagRegister
