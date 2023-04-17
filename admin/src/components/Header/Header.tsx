import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
function Header() {
  const navigate = useNavigate();
  
  return (
    <div className={styles.header}>
      <div className={styles.logoAndLogin}>
        <p onClick={() => navigate('/')}>Logo</p>
        <p>admin123</p>
      </div>
      <div className={styles.category}>
        <button>카테고리 관리</button>
        <button onClick={() => navigate('/product/create')}>여행 상품 관리</button>
        <button onClick={() => navigate('/registerAd')}>광고 관리</button>
        <button>기타 관리</button>
      </div>
    </div>
  );
}
export default Header;
