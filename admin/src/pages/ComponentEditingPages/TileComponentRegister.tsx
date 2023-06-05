import React, {useState, ChangeEvent, useEffect} from "react";
import styles from '../../components/ComponentEditing/component.module.css'
import {CategoryLogic} from "../../logics/CategoryLogic";
import {ItemLogic} from "../../logics/ItemLogic";
import SelectableTable from "../../components/Table/SelectableTable";
import {ProductTableColumns} from "../../components/Table/ProductTableColumns";

interface TileData {
	tileName: string;
	tileFileName: string | null;
	tileBase64: string | null;
	itemCode: number | null;
}

const TileComponentRegister = () => {
	
	const [title, setTitle] = useState<string>("");
	
	const [tileCount, setTileCount] = useState<number>(1);
	const [tileData, setTileData] = useState<TileData[]>([]); // 타일 데이터 배열
	
	const [category, setCategory] = useState<string[]>([]);
	const [productListArr, setProductListArr] = useState<any>([]);
	
	const [selected, setSelected] = useState<any[]>([]);
	
	useEffect(() => {
		
		(async () => {
			const response = await CategoryLogic.getCategoryArr();
			setCategory(response.map((v: any) => (v.displayHashTag)));
		})();
		
		(async () => {
			const response = await ItemLogic.getProductItems({
				"option": 1,
				"page": 1,
				"limit": 100,
				"categoryNames": category
			})
			setProductListArr(response);
		})();
		
	}, [])
	
	
	const handleTileNameChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		const newData = [...tileData];
		newData[index] = {...newData[index], tileName: value};
		setTileData(newData);
	};
	
	
	const handleImageUpload = (index: number, event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		const reader = new FileReader();
		
		if (file) {
			reader.onloadend = () => {
				const base64 = reader.result as string;
				const fileName = file.name;
				const newData = [...tileData];
				newData[index] = {...newData[index], tileFileName: fileName, tileBase64: base64};
				setTileData(newData);
			};
			
			reader.readAsDataURL(file);
		} else {
			const newData = [...tileData];
			newData[index] = {...newData[index], tileFileName: null, tileBase64: null};
			setTileData(newData);
		}
	};
	
	const handleProductSelect = (index: number, itemCode: number) => {
		const newData = [...tileData];
		newData[index] = {...newData[index], itemCode};
		setTileData(newData);
	};
	
	const handleTileCount = (upDown: string) => {
		if(upDown == "down"){
			if(tileCount - 1 > 0){
				setTileData(tileData.splice(tileCount, 1));
				setTileCount(tileCount - 1);
				return;
			}
			window.confirm("타일 개수는 1개보다 적을 수 없습니다.");
			return;
		}
		setTileCount(tileCount + 1);
	}
	
	const handleSave = () => {
		// 타일 데이터 저장 처리
		console.log(tileData);
	};
	
	useEffect(() => {
		console.log(tileData)
	}, [tileData])
	
	const renderTileBlock = (index: number) => (
		<div key={index}>
			<hr
				style={{marginBottom: 20}}
			/>
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
				<strong>상품 목록</strong>
			</p>
			
			<SelectableTable
				route={""} columns={ProductTableColumns} data={productListArr}
				setStateValue={(itemCode) => handleProductSelect(index, itemCode)}
				value={tileData[index]?.itemCode || null}
			/>
		</div>
	);
	
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
						   name="componentTitle"
						   placeholder="컴포넌트 이름을 입력하세요"
						   onChange={(e) => setTitle(e.target.value)}
					/>
				</p>
				
				<p className={styles.p}>
					<div
						className={styles.pTitle}
					>
						<strong>추가할 타일 개수</strong>
					</div>
					
					<div
						style={{display: "flex", flexDirection: "row", alignItems: "center"}}
					>
						<input className={styles.textInput}
							   type="text"
							   name="tileCount"
							   value={tileCount}
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
				
				{
					Array(tileCount)
						.fill([])
						.map((_, index) => renderTileBlock(index))
				}
			</div>
		</div>
	)
}

export default TileComponentRegister;

