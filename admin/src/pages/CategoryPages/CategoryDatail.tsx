import React, {useState, useRef, useEffect} from "react";
import styles from '../../components/Category/CategoryDetail.module.css'


import {useParams, useNavigate} from "react-router-dom";
import ToastEditor from "../../components/ToastEditor";
import axios from "axios";
import Table from "../../components/Table/Table";
import {CategoryProductTableColumns} from "../../components/Table/CategoryProductTableColumns";


const CategoryDetail = () => {
	
	const {id} = useParams();
	const navigate = useNavigate();
	
	const onClickRoute = (id: number) => {
		navigate(`/staff/${id}`);
	};
	
	const [categoryTitle, setCategoryTitle] = useState("");
	
	const [categoryImage, setCategoryImage] = useState("");
	const categoryImageRef = useRef<HTMLInputElement | null>(null);
	
	const [mainDescription, setMainDescription] = useState<string>("")
	const [subDescription, setSubDescription] = useState<string>("")
	
	const mainDescriptionHandle = (value: string) => setMainDescription(value);
	const subDescriptionHandle = (value: string) => setSubDescription(value);
	
	const [productListArr, setProductListArr] = useState([]);
	
	useEffect(() => {
		(async () => {
			await axios.post(`https://ammuse.store/test/api/category/detail`, {
				"id": id,
				"offset": 1,
				"limit": 10
			})
				.then(r => setProductListArr(r.data.data.data))
				// .then(r => console.log(r.data.data.data))
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
			}
		}
	};
	
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<form>
					<p className={styles.p}>
						<div
							className={styles.pTitle}
						>
							<strong>카테고리</strong>
						</div>
						
						<input className={styles.textInput}
							   type="text"
							   name="categoryName"
							   placeholder="추가할 카테고리 이름을 입력해주세요."
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
				
				<div
					className={styles.pTitle}
				>
					<strong>등록된 상품</strong>
				</div>
				<Table
					columns={CategoryProductTableColumns}
					data={productListArr}
				/>
				
				<div
					className={styles.p}
				>
					<button className={styles.button}>
						수정하기
					</button>
				</div>
			
			</div>
		
		
		</div>
	
	)
	
}

export default CategoryDetail;
