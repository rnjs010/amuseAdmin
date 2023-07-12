import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../services/axiosInstance";
import styles from "./ProductStatus.module.css";
import { useNavigate } from "react-router-dom";

function ProductStatus() {
  const navigate = useNavigate();

  const [activeItemList, setActiveItemList] = useState([{}]);
  useEffect(() => {
    axiosInstance.get("/main/current-item").then((res) => {
      const data = res.data.data.items;
      const processedData = data.map((item: any) => ({
        product_code: item.product_code,
        title: item.title,
        imageUrl: item.imageUrl,
      }));
      setActiveItemList(processedData);
    });
  }, []);

  useEffect(() => {
    console.log(activeItemList);
  }, [activeItemList]);

  return (
    <div>
      <div className={styles.activeItemContainer}>
        <div className={styles.title}>활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.activeItemList}>
          {activeItemList.map((item: any) => (
            <li className={styles.activeItem}>
              <img className={styles.activeImg} src={item.imageUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => navigate(`/product/edit/${item.product_code}`)}>수정</button>
                <button
                  onClick={() => {
                    axios
                      .get("http://43.200.171.174/test/api/product", {
                        params: {
                          itemCode: item.product_code,
                        },
                      })
                      .then((res) => console.log(res))
                      .catch(console.error);
                  }}
                >
                  삭제
                </button>
                <button>비활성화</button>
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
      </div>
    </div>
  );
}

export default ProductStatus;
