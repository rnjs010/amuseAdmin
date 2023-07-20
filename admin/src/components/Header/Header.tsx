import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { isLoggedIn } from "../../pages/atoms";
import { useRecoilState } from "recoil";

function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  console.log("로그인 여부", loggedIn);
  const allCookies = document.cookie;
  console.log("내가만든쿠키", allCookies);
  return (
    <div className={styles.header}>
      <div className={styles.logoAndLogin}>
        <img className={styles.logo} src="/logo.png" alt="Logo" />
        <p>admin123</p>
      </div>
      <div className={styles.category}>
        <button onClick={() => navigate("/product")}>여행 상품 관리</button>
        <button onClick={() => navigate("/staff")}>가이드 관리</button>
        <button onClick={() => navigate("/componentV2")}>컴포넌트 관리(V2)</button>
        <button onClick={() => navigate("/page")}>페이지 관리</button>
        <button onClick={() => navigate("/manager")}>권한 관리</button>
        <button onClick={() => navigate("/login")}>로그인</button>

        {/*<button onClick={() => navigate('/component')}> 컴포넌트 관리 </button>*/}
        {/*<button onClick={() => navigate('/category')}>카테고리 관리</button>*/}
        {/*<button onClick={() => navigate('/ad')}>광고 관리</button>*/}
      </div>
    </div>
  );
}

export default Header;
