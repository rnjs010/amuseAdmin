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
      <div className={styles.activeItemContainer}>
        <div className={styles.title}>활성화 상품</div>
        <ul className={styles.activeItemList}>
          {activeItemList.map((item:any) => (
            <li className={styles.activeItem}>
              <img className={styles.activeImg}src={item.imageUrl} alt="" />
              <div className={styles.productCodeContainer}>
                <p className={styles.label}>상품 코드</p>
                <p>{item.product_code}</p>
              </div>
              <div className={styles.productTitleContainer}>
                <p className={styles.label}>제목</p>
                <p>{item.title}</p>
              </div>
              
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className={styles.title}>비활성화 상품</div>
      </div>
    </div>
  );
}

export default ProductStatus;