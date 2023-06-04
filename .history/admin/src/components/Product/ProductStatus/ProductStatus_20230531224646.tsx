import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import styles from './ProductStatus.module.css';

function ProductStatus() {
  const [activeItemList, setActiveItemList] = useState([
    {}
  ]);
  useEffect(() => {
    axiosInstance.get('/main/current-item')
  .then((res) => {
      const data = res.data.data.items;
      const processedData = data.map((item: any) => ({
        product_code: item.product_code,
        title: item.title,
        imageUrl: item.imageUrl
      }))
      setActiveItemList(processedData)
    });
  }, [])

  useEffect(() => {
    console.log(activeItemList);
  }, [activeItemList]);

  return (
    <div>
      <div className={`${styles.container} ${styles.activeItem}`}>
        <p>활성화 상품</p>
        {activeItemList.map((item:any) => (
          <li className={styles.activeItem}>
            <p>{item.product_code}</p>
            <p>{item.title}</p>
          </li>
        ))}
      </div>

      <div>
        <p>비활성화 상품</p>
      </div>
    </div>
  );
}

export default ProductStatus;