import axiosInstance from '../../../services/axiosInstance';

function ProductEdit() {
  axiosInstance.get('/test/api/product/DOM-60092B044EDEQ')
  .then((res) => console.log(res));
  return (
    <div>
      
    </div>
  );
}

export default ProductEdit;