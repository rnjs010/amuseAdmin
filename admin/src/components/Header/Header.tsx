import styles from './Header.module.css';
function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logoAndLogin}>
        <p>Logo</p>
        <p>admin123</p>
      </div>
      <div className={styles.category}>
        <button>카테고리 관리</button>
        <button>여행 상품 관리</button>
        <button>광고 관리</button>
        <button>기타 관리</button>
      </div>
    </div>
  );
}
export default Header;