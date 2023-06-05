import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../services/axiosInstance';
import styles from './ProductStatus.module.css';
import { useNavigate } from 'react-router-dom';

interface Item {
  itemCode: string,
  title: string,
  imgUrl: string
}

function ProductStatus() {
  const navigate = useNavigate();

  const [activeItemList, setActiveItemList] = useState<Item[]>([{
    itemCode: '',
    title: '',
    imgUrl: ''
  }]);

  const [inActiveItemList, setInActiveItemList] = useState<Item[]>([{
    itemCode: '',
    title: '',
    imgUrl: ''
  }]);

  const [activePageCount, setActivePageCount] = useState<number>(1);
  const [inActivePageCount, setInActivePageCount] = useState<number>(1);
  
  useEffect(() => {
    axios.get('https://ammuse.store/test/api/product/getList/byDisplay', {
      params: {
        limit: 8,
        page: 1,
        displayStatus: 'DISPLAY'
      }
    })
      .then((res) => {
          setActivePageCount(res.data.data.pageCount);
          const data = res.data.data.data;
          const processedData = data.map((item: any) => ({
            itemCode: item.itemCode,
            title: item.title,
            imgUrl: item.imgUrl
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
          setInActivePageCount(res.data.data.pageCount);
          const data = res.data.data.data;
          const processedData = data.map((item: any) => ({
            itemCode: item.itemCode,
            title: item.title,
            imgUrl: item.imgUrl
          }))
          setInActiveItemList(processedData)
        });
  }, [])

  const handleDeleteProducts =  (itemCode: string) => {
    setActiveItemList(activeItemList.filter((item) => {return item.itemCode !== itemCode}))
    axios.get('https://ammuse.store/test/api/product/delete', {
       params: {
         itemCode
       }
    })
    .then((res) => console.log(res))
    .catch(console.error);
  }

  const handleInActivateProduct = (item: Item) => {
    axios.get('https://ammuse.store/test/api/change/displayStatus', {
      params: {
        status: 'HIDDEN',
        itemCode: item.itemCode
      }
    })
    .then((res) => {
      console.log(res);
      setActiveItemList(activeItemList.filter((activeItem) => {return activeItem.itemCode !== item.itemCode}));
      setInActiveItemList((prev) => [...prev, item]);
    })
    .catch(console.error);
  }

  const handleActivateProduct = (item: Item) => {
    axios.get('https://ammuse.store/test/api/change/displayStatus', {
      params: {
        status: 'DISPLAY',
        itemCode: item.itemCode
      }
    })
    .then((res) => {
      console.log(res);
      setInActiveItemList(inActiveItemList.filter((inActiveItem) => {return inActiveItem.itemCode !== item.itemCode}));
      setActiveItemList((prev) => [...prev, item]);
    })
    .catch(console.error);
  }

  return (
    <div>
      <div className={styles.activeItemContainer}>
        <div className={styles.title}>활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.activeItemList}>
          {activeItemList.map((item:any) => (
            <li className={styles.activeItem} key={item.itemCode}>
              <img className={styles.activeImg}src={item.imgUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => navigate(`/product/edit/${item.itemCode}`)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.itemCode)}>삭제</button>
                <button onClick={() => handleInActivateProduct(item)}>비활성화</button>
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
            <li className={styles.inActiveItem} key={item.itemCode}>
              <img className={styles.inActiveImg}src={item.imgUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => navigate(`/product/edit/${item.itemCode}`)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.itemCode)}>삭제</button>
                <button onClick={() => handleActivateProduct(item)}>활성화</button>
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