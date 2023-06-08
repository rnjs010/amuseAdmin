import React, {useState, ChangeEvent, useEffect} from "react";
import styles from "../../components/ComponentEditing/component.module.css";

import {useParams} from "react-router-dom";


import {CategoryLogic} from "../../logics/CategoryLogic";
import {ItemLogic} from "../../logics/ItemLogic";
import {ComponentLogic} from "../../logics/ComponentLogic";

// 타일 데이터 타입 정의
interface TileData {
	tileName: string;
	tileFileName: string | null;
	tileBase64: string | null;
	products: any[];
}

const TileComponentDetail = () => {
	
	const {id} = useParams();
	
	const [title, setTitle] = useState<string>("");
	const [tileCount, setTileCount] = useState<number>(1);
	const [tileData, setTileData] = useState<TileData[]>([]); // 타일 데이터 배열
	
	const [category, setCategory] = useState<string[]>([]);
	const [productListArr, setProductListArr] = useState<any>([]);
	
	
	useEffect(() => {
		// 카테고리 목록 가져오기
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategory(response.map((v: any) => v.displayHashTag));
		})();
		
		// 상품 목록 가져오기
		(async () => {
			const response = await ItemLogic.getProductItems({
				option: 1,
				page: 1,
				limit: 100,
				categoryNames: category,
			});
			setProductListArr(response);
		})();
	}, []);
	
	useEffect(() => {
		console.log(tileData)
	}, [tileData])
	
	const handleTileNameChange = (
		index: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const {value} = event.target;
		const newData = [...tileData];
		
		// 타일이 존재하지 않을 때 새로운 타일 추가
		if (index >= newData.length) {
			newData.push({
				tileName: value,
				tileFileName: null,
				tileBase64: null,
				products: [],
			});
		} else {
			newData[index] = {...newData[index], tileName: value};
		}
		
		setTileData(newData);
	};
	
	const handleImageUpload = (
		index: number,
		event: ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0] || null;
		const reader = new FileReader();
		
		if (file) {
			reader.onloadend = () => {
				const base64 = reader.result as string;
				const fileName = file.name;
				const newData = [...tileData];
				newData[index] = {
					...newData[index],
					tileFileName: fileName,
					tileBase64: base64,
				};
				setTileData(newData);
			};
			
			reader.readAsDataURL(file);
		} else {
			const newData = [...tileData];
			newData[index] = {
				...newData[index],
				tileFileName: null,
				tileBase64: null,
			};
			setTileData(newData);
		}
	};
	
	const handleProductSelect = (index: number, product: any) => {
		
		const newData = [...tileData];
		const selectedProducts = newData[index]?.products || [];
		
		console.log(selectedProducts)
		console.log(product)
		
		const productIndex = selectedProducts.findIndex((p) => (p.id) ? (p.id == product.id) : (p.product_code == product.id));
		
		if (productIndex !== -1) selectedProducts.splice(productIndex, 1);
		else selectedProducts.push(product);
		
		newData[index] = {...newData[index], products: selectedProducts};
		setTileData(newData);
	};
	
	const handleTileCount = (upDown: string) => {
		if (upDown === "down") {
			if (tileCount - 1 > 0) {
				setTileData(tileData.splice(tileCount, 1));
				setTileCount(tileCount - 1);
				return;
			}
			window.confirm("타일 개수는 1개보다 적을 수 없습니다.");
			return;
		}
		setTileCount(tileCount + 1);
	};
	
	const handleSave = () => {
		// 타일 데이터 저장 처리
		const tileDataWithItemCode = tileData.map((tile) => ({
			tileName: tile.tileName,
			tileBase64: tile.tileBase64,
			tileFileName: tile.tileFileName,
			itemCode: tile.products.map((product) => product.product_code ?? product.id),
		}));
		
		console.log({
			title: title,
			type: "타일",
			createdBy: "daw916@naver.com",
			tile: tileDataWithItemCode
		});
		
		// return;
		
		(async () => {
			const response = await ComponentLogic.editTileComponent({
				id: id,
				title: title,
				type: "타일",
				createdBy: "daw916@naver.com",
				updatedBy: "daw916@naver.com",
				tile: tileDataWithItemCode
			}).then(() => {
				window.confirm("등록되었습니다.");
				window.history.back();
			}).catch(e => window.confirm(e));
			console.log(response)
		})()
	};
	
	const handleDelete = () => {
		(async () => {
			const response = await ComponentLogic.deleteTileComponent(id).then(() => {
				window.confirm("삭제되었습니다.");
				window.history.back();
			}).catch(e => window.confirm(e));
			console.log(response)
		})()
	};
	
	useEffect(() => {
		(async () => {
			const response = await ComponentLogic.getComponentDetail(id);
			console.log(response)
			
			setTitle(response.title)
			setTileCount(response.tile.length)
			
			const tile = response.tile;
			const tileDataWithItemCode = tile.map((tile: any) => ({
				tileName: tile.title,
				tileBase64: tile.tileBase64,
				tileFileName: tile.tileFileName,
				products: tile.productList
			}));
			
			console.log(tileDataWithItemCode)
			
			setTileData(tileDataWithItemCode)
			
		})();
	}, [])
	
	const renderTileBlock = (index: number) => (
		<div key={index}>
			<hr style={{marginBottom: 20}}/>
			<div className={styles.pTitle}>
				<strong>타일명</strong>
			</div>
			<input
				className={styles.textInput}
				type="text"
				name="tileName"
				placeholder="타일 이름을 입력하세요"
				value={tileData[index]?.tileName || ""}
				onChange={(event) => handleTileNameChange(index, event)}
			/>
			<p className={styles.p}>
				<strong>타일 사진 추가</strong>
				<input
					type="file"
					accept="image/*"
					onChange={(event) => handleImageUpload(index, event)}
				/>
			</p>
			<p className={styles.p}>
				<div className={styles.pTitle}>
					<strong>등록된 컴포넌트</strong>
				</div>
				
				{tileData[index]?.products.map((v: any, i: any) => (
					<div key={i} className={styles.componentListCell}>
						<div style={{marginLeft: 10, width: "auto"}}> id: {v.product_code ?? v.id} </div>
						<div style={{marginLeft: 10, width: "auto"}}> title: {v.title} </div>
						<div style={{marginLeft: 10, width: "auto"}}>
							category: {JSON.stringify(v.category, null, 4) ?? JSON.stringify(v.categoryNames, null, 4)}
						</div>
					</div>
				))}
			</p>
			<p className={styles.p}>
				<div className={styles.pTitle}>
					<strong>컴포넌트 목록</strong>
				</div>
				{productListArr.map((v: any, i: any) => (
					<div key={i} className={styles.componentListCell}>
						<input
							type="checkbox"
							onChange={(e) => handleProductSelect(index, v)}
							value={v.id}
							checked={tileData[index]?.products?.some((p) =>
								(p.id) ? (p.id == v.id) : (p.product_code == v.id)
							)}
						/>
						<div style={{marginLeft: 10, width: "auto"}}> id: {v.id} </div>
						<div style={{marginLeft: 10, width: "auto"}}> title: {v.title} </div>
						<div style={{marginLeft: 10, width: "auto"}}>
							category: {JSON.stringify(v.category, null, 4) ?? JSON.stringify(v.categoryNames, null, 4)}
						</div>
					</div>
				))}
			</p>
		</div>
	);
	
	return (
		<div className={styles.container}>
			<div className={styles.body}>
				
				{id}
				<p className={styles.p}>
					<div className={styles.pTitle}>
						<strong>컴포넌트 명</strong>
					</div>
					<input
						className={styles.textInput}
						type="text"
						name="componentTitle"
						placeholder="컴포넌트 이름을 입력하세요"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</p>
				<p className={styles.p}>
					<div className={styles.pTitle}>
						<strong>추가할 타일 개수</strong>
					</div>
					<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
						<input
							className={styles.textInput}
							type="text"
							name="tileCount"
							value={tileCount}
							readOnly
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
							onClick={() => handleTileCount("up")}
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
							onClick={() => handleTileCount("down")}
						>
							<div>
								-
							</div>
						</button>
					</div>
				</p>
				{Array.from({length: tileCount}).map((_, index) => renderTileBlock(index))}
				
				
				<div className={styles.p}>
					<button className={styles.button}
							onClick={handleSave}
					>
						수정하기
					</button>
					
					<button className={styles.button}
							onClick={handleDelete}
					>
						삭제하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default TileComponentDetail;
