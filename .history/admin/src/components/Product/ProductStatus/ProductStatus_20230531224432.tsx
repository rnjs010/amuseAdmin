import { useEffect, useState } from 'react';
import axiosInstance from '../../../services/axiosInstance';

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
      <div>
        <p>활성화 상품</p>
        {activeItemList.map((item) => (
          <li>item.title</li>
        ))}
      </div>

      <div>
        <p>비활성화 상품</p>
      </div>
    </div>
  );
}

export default ProductStatus;