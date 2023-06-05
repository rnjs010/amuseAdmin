import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import styles from './ProductStatus.module.css';
import { useNavigate } from 'react-router-dom';

function ProductStatus() {
  const navigate = useNavigate();

  const [activeItemList, setActiveItemList] = useState([{
    product_code: '',
    title: '',
    imageUrl: ''
  }]);

  const [inActiveItemList, setInActiveItemList] = useState([{
    product_code: '',
    title: '',
    imageUrl: ''
  }]);

  useEffect(() => {
    axios.get('https://ammuse.store/test/api/product/getList/byDisplay', {
      params: {
        limit: 8,
        page: 1,
        displayStatus: 'DISPLAY'
      }
    })
      .then((res) => {
        console.log(res);
          const data = res.data.data.data;
          const processedData = data.map((item: any) => ({
            product_code: item.itemCode,
            title: item.title,
            imageUrl: item.imgUrl
          }))
          setActiveItemList(processedData)
        });
  }, [])

  useEffect(() => {
    axios.get('https://ammuse.store/test/api/product/getList/byDisplay', {
      params: {
        limit: 8,
        page: 1,
        displayStatus: 'HIDDEN'
      }
    })
      .then((res) => {
        console.log(res);
          const data = res.data.data.data;
          const processedData = data.map((item: any) => ({
            product_code: item.itemCode,
            title: item.title,
            imageUrl: item.imgUrl
          }))
          setInActiveItemList(processedData)
        });
  }, [])

  const handleDeleteProducts =  (itemCode: string) => {
    setActiveItemList(activeItemList.filter((item) => {return item.product_code !== itemCode}))
    axios.get('https://ammuse.store/test/api/product/delete', {
       params: {
         itemCode
       }
    })
    .then((res) => console.log(res))
    .catch(console.error);
  }

  const handleInActivateProduct = (itemCode: string) => {
    axios.get('https://ammuse.store/test/api/change/displayStatus', {
      params: {
        status: 'HIDDEN',
        itemCode
      }
    })
    .then((res) => console.log(res))
    .catch(console.error);
  }

  const handleActivateProduct = (itemCode: string) => {
    axios.get('https://ammuse.store/test/api/change/displayStatus', {
      params: {
        status: 'DISPLAY',
        itemCode
      }
    })
  }

  return (
    <div>
      <div className={styles.activeItemContainer}>
        <div className={styles.title}>활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.activeItemList}>
          {activeItemList.map((item:any) => (
            <li className={styles.activeItem}>
              <img className={styles.activeImg}src={item.imageUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => navigate(`/product/edit/${item.product_code}`)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.product_code)}>삭제</button>
                <button onClick={() => handleInActivateProduct(item.product_code)}>비활성화</button>
                <button>복사</button>
              </div>
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

      <div className={styles.inActiveItemContainer}>
        <div className={styles.title}>비활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.inActiveItemList}>
          {inActiveItemList.map((item:any) => (
            <li className={styles.activeItem}>
              <img className={styles.activeImg}src={item.imageUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => navigate(`/product/edit/${item.product_code}`)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.product_code)}>삭제</button>
                <button onClick={() => handleInActivateProduct(item.product_code)}>활성화</button>
                <button>복사</button>
              </div>
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
    </div>
  );
}

export default ProductStatus;