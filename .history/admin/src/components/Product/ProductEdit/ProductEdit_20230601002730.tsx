import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance';
import { useEffect } from 'react';

function ProductEdit() {
  const params = useParams();
  const productId = params.productId;
  useEffect(() => {
    axiosInstance.get(`/test/api/product/${productId}`)
      .then((res) => console.log(res));
  }, [])
  
  return (
    <div>
      
    </div>
  );
}

export default ProductEdit;