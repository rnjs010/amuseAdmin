import axiosInstance from '../../../services/axiosInstance';

function ProductStatus() {
  axiosInstance.get('/main/current-item')
  .then((res) => console.log(res));
  return (
    <div>
      
    </div>
  );
}

export default ProductStatus;