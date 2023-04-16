import ProductForm from '../components/Product/ProductForm/ProductForm';
import ProductSearch from '../components/Product/ProductSearch/ProductSearch';

function ProductCreate() {
  return (
    <div>
      <ProductSearch isDeleting={false}/>
      <ProductForm/>
    </div>
  );
}

export default ProductCreate;