import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ProductSearch.module.css';
import axiosInstance from '../../../services/axiosInstance';

interface ProductSearchProps {
  isDeleting: boolean,
}

type Category = {
  name: string;
}

type Product = {
  category: string;
  code: string;
}

function ProductSearch({isDeleting}: ProductSearchProps){
  const [category, setCategory] = useState<string[]>([]);
  const [categoryList, setCategoryList] = useState<string[]>([]);

  useEffect(
    () => {
      axiosInstance.get('/test/api/category/list')
        .then((res) => {
          setCategoryList(res.data.data);
        })
        .catch((err) => console.error(`failed to get categories: ${err}`));
    }, []
  );

  const renderCategoryOptions = () => {
    return categoryList.map((category) => {
      return (
        <option key={category} value={category}>
          {category}
        </option>
      );
    });
  };

  const [code, setCode] = useState<string>('');


  // const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCategory(event.target.value);
  // }

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  }

  // const handleSearchProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault(); // 버튼 클릭시 마다 리렌더링 방지
  //   const product: Product = {
  //     category: category,
  //     code: code
  //   };
  //   console.log(product);
  //   // axios.post('')
  // }


  return (
    <div className={`${styles.container}`}>
      <div className={styles.category}>
        <span className={styles.title}>여행 카테고리</span>
        <select onChange={handleCategoryChange}>
          {renderCategoryOptions()}
        </select>
      </div>
      <div className={styles.code}>
          <span className={styles.title}>상품 코드</span>
          <input type="text" onChange={handleCodeChange}/>
      </div>
      {isDeleting && <button onClick={handleSearchProduct}>검색</button>}
    </div>
  );
}

export default ProductSearch;