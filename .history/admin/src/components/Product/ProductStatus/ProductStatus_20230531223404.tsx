import { useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

function ProductStatus() {
  const [activeItemList, setActiveItemList] = useState([]);
  axiosInstance.get('/main/current-item')
  .then((res) => console.log(res.data.data.items));
  return (
    <div>
      <div>
        <p>활성화 상품</p>
      </div>

      <div>
        <p>비활성화 상품</p>
      </div>
    </div>
  );
}

export default ProductStatus;