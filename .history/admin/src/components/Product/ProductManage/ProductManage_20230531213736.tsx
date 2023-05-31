import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ProductManage.module.css';
import { useNavigate } from 'react-router-dom';


function ProductManage(){
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
      <div onClick={() => navigate('/product/status')}>상품 현황</div>
      <div onClick={() => navigate('/product/create')}>상품 추가</div>
      <div onClick={() => navigate('/product/delete')}>상품 삭제</div>
    </div>
  );
}

export default ProductManage;