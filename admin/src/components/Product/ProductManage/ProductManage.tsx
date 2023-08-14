import React,{ useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductManage.module.css";
import { isLoggedIn } from "../../../pages/atoms";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";

function ProductManage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["id"])
  const [loggedIn,setLoggedIn] = useRecoilState(isLoggedIn);
  useEffect(()=>{
    if(cookies.id &&  cookies.id !== "undefined" && cookies.id !== "null"){
      setLoggedIn(true)
    }
  },[])

  useEffect(()=>{  
    if(!cookies.id || !loggedIn){
      navigate("/login")
    }
  },[])
  return (
    <div className={`${styles.container} ${styles.productAdmin}`}>
      <div onClick={() => navigate("/status")} className={styles.routeBox}>
        상품 현황
      </div>
      <div onClick={() => navigate("/create")} className={styles.routeBox}>
        상품 추가
      </div>
    </div>
  );
}

export default ProductManage;
