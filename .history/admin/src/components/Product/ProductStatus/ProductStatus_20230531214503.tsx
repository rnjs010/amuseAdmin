import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ProductStatus.module.css';
import { useNavigate } from 'react-router-dom';


function ProductStatus(){
  const navigate = useNavigate();
  return (
    <div className={`${styles.container}`}>
    </div>
  );
}

export default ProductStatus;