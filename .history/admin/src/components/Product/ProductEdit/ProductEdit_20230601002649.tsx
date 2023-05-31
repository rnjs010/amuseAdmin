import { useParams } from 'react-router-dom';
import axiosInstance from '../../../services/axiosInstance';

function ProductEdit() {
  const params = useParams();
  console.log(params);
  axiosInstance.get('/test/api/product/DOM-60092B044EDEQ')
  .then((res) => console.log(res));
  return (
    <div>
      
    </div>
  );
}

export default ProductEdit;