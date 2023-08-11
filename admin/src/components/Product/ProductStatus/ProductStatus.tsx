import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../../services/axiosInstance";
import styles from "./ProductStatus.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface Item {
  item_db_id: number;
  itemCode: string;
  title: string;
  imgUrl: string;
}

function ProductStatus() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);

  const [activeItemList, setActiveItemList] = useState<Item[]>([
    {
      item_db_id: 0,
      itemCode: "",
      title: "",
      imgUrl: "",
    },
  ]);

  const [inActiveItemList, setInActiveItemList] = useState<Item[]>([
    {
      item_db_id: 0,
      itemCode: "",
      title: "",
      imgUrl: "",
    },
  ]);

  const [activePageCount, setActivePageCount] = useState<number>(1);
  const [currentActivePage, setCurrentActivePage] = useState<number>(1);
  const [inActivePageCount, setInActivePageCount] = useState<number>(1);
  const [currentInActivePage, setCurrentInActivePage] = useState<number>(1);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/test/api/product/getList/byDisplay`, {
        params: {
          limit: 8,
          page: currentActivePage,
          displayStatus: "DISPLAY",
        },
      })
      .then((res) => {
        setActivePageCount(res.data.data.pageCount);
        const data = res.data.data.data;
        // const processedData = data.map((item: any) => ({
        //   itemCode: item.itemCode,
        //   title: item.title,
        //   imgUrl: item.imgUrl,
        // }));
        console.log(data)
        setActiveItemList(data);
      });
  }, [currentActivePage]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_AMUSE_API}/test/api/product/getList/byDisplay`, {
        params: {
          limit: 8,
          page: currentInActivePage,
          displayStatus: "HIDDEN",
        },
      })
      .then((res) => {
        setInActivePageCount(res.data.data.pageCount);
        const data = res.data.data.data;
        const processedData = data.map((item: any) => ({
          item_db_id:item.item_db_id,
          itemCode: item.itemCode,
          title: item.title,
          imgUrl: item.imgUrl,
        }));
        setInActiveItemList(processedData);
      });
  }, [currentInActivePage]);

  const handleDeleteProducts = (itemCode: string,itemId:number,isActive:boolean) => {
    const confirmDelete = window.confirm("삭제하시겠습니까?");
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_AMUSE_API}/test/api/product/delete?id=${itemId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${cookies.id}`,
          },
          params: {
            itemCode,
          },
        })
        .then((res) =>{ 
          console.log(res)
          if(isActive){
            setActiveItemList(
              activeItemList.filter((item) => {
                return item.itemCode !== itemCode;
              })
            );
          }else{
            setInActiveItemList(
              inActiveItemList.filter((item) => {
                return item.itemCode !== itemCode;
              })
            );
          }
        }).catch(console.error)
    }
  };

  const handleInActivateProduct = (item: Item) => {
    console.log("item",item);
    const confirmNone = window.confirm("상품을 비활성화 하시겠습니까?");
    if (confirmNone) {
      axios
        .post(`${process.env.REACT_APP_AMUSE_API}/test/api/change/item/${item.item_db_id}/displayStatus`, {
          display_true: false,
        })
        .then((res) => {
          console.log(res);
          setActiveItemList(
            activeItemList.filter((activeItem) => {
              return activeItem.itemCode !== item.itemCode;
            })
          );
          setInActiveItemList((prev) => [...prev, item]);
        })
        .catch(console.error);
    }
  };

  const handleActivateProduct = (item: Item) => {
    console.log(item);
    const confirmActive = window.confirm("상품을 활성화 하시겠습니까?");
    if (confirmActive) {
      axios
        .post(`${process.env.REACT_APP_AMUSE_API}/test/api/change/item/${item.item_db_id}/displayStatus`, {
          display_true: true,
        })
        .then((res) => {
          console.log(res);
          setInActiveItemList(
            inActiveItemList.filter((inActiveItem) => {
              return inActiveItem.itemCode !== item.itemCode;
            })
          );
          setActiveItemList((prev) => [...prev, item]);
        })
        .catch(console.error);
    }
  };
  const handleEditProduct=(item:any)=>{
    window.sessionStorage.setItem(`item`,JSON.stringify(item))
    navigate(`/edit/${item?.itemCode}`)
  }
  const handleCopyProduct=(item:any)=>{
    window.sessionStorage.setItem(`${item.itemCode}`,JSON.stringify(item))
    navigate(`/copy/${item?.itemCode}`)
  }

  return (
    <div>
      <div className={styles.activeItemContainer}>
        <div className={styles.title}>활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.activeItemList}>
          {activeItemList.map((item: any) => (
            <li className={styles.activeItem} key={item.itemCode} style={{minHeight:284}}>
              <img className={styles.activeImg} src={item.imgUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => handleEditProduct(item)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.itemCode,item.item_db_id,true)}>삭제</button>
                <button onClick={() => handleInActivateProduct(item)}>비활성화</button>
                <button onClick={() => handleCopyProduct(item)}>복사</button>
              </div>
              <div className={styles.productCodeContainer}>
                <p className={styles.label}>상품 코드</p>
                <p>{item.itemCode}</p>
              </div>
              <div className={styles.productTitleContainer}>
                <p className={styles.label}>제목</p>
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.pageBtnContainer}>
          {[...Array(activePageCount)].map((e, idx) => (
            <button className={styles.pageBtn} key={idx} onClick={() => setCurrentActivePage(idx + 1)}>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.inActiveItemContainer}>
        <div className={styles.title}>비활성화 상품</div>
        <div className={styles.divider}></div>
        <ul className={styles.inActiveItemList}>
          {inActiveItemList.map((item: any) => (
            <li className={styles.inActiveItem} key={item.itemCode} style={{minHeight:284}}>
              <img className={styles.inActiveImg} src={item.imgUrl} alt="" />
              <div className={styles.btnContainer}>
                <button onClick={() => handleEditProduct(item)}>수정</button>
                <button onClick={() => handleDeleteProducts(item.itemCode,item.item_db_id,false)}>삭제</button>
                <button onClick={() => handleActivateProduct(item)}>활성화</button>
                <button onClick={() => handleCopyProduct(item)}>복사</button>
              </div>
              <div className={styles.productCodeContainer}>
                <p className={styles.label}>상품 코드</p>
                <p>{item.itemCode}</p>
              </div>
              <div className={styles.productTitleContainer}>
                <p className={styles.label}>제목</p>
                <p>{item.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.pageBtnContainer}>
          {[...Array(inActivePageCount)].map((e, idx) => (
            <button className={styles.pageBtn} key={idx} onClick={() => setCurrentInActivePage(idx + 1)}>
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductStatus;
