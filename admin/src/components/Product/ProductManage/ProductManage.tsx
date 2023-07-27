import { useNavigate } from "react-router-dom";
import styles from "./ProductManage.module.css";

function ProductManage() {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container} ${styles.productAdmin}`}>
      <div onClick={() => navigate("/status")} className={styles.routeBox}>
        상품 현황
      </div>
      <div onClick={() => navigate("/create")} className={styles.routeBox}>
        상품 추가
      </div>
    </div>
  );
}

export default ProductManage;
