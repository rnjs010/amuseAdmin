import styles from './ProductForm.module.css';

function ProductForm() {
  return (
    <div>
        <div className={`${styles.container} ${styles.name}`}>
            <span>여행 상품명</span>
            <input type="text"/>
        </div>

        <div className={`${styles.container} ${styles.ticket}`}>
          <div>
            <span>티켓 관리</span>
            <button className={styles.addBtn}>추가하기</button>
          </div>
          <div className={styles.status}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.content}`}>
          <div>
            <span>상품 소개 관리</span>
            <button className={styles.addBtn}>추가하기</button>
          </div>
          <div className={styles.status}>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
    </div>
  );
}

export default ProductForm;