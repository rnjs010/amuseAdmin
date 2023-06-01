import axiosInstance from '../../../services/axiosInstance';

function ProductEdit() {
  axiosInstance.get('/test/api/product/')
  .then((res) => console.log(res));
  return (
    <div>
      
    </div>
  );
}

export default ProductEdit;