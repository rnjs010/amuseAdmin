import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';


function ProductManage(){


  return (
    <div className={`${styles.container}`}>
      <div>상품 현황</div>
      <div>상품 추가</div>
      <div>상품 삭제</div>
    </div>
  );
}

export default ProductManage;