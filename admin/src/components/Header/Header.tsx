import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { isLoggedIn } from "../../pages/atoms";
import { useRecoilState } from "recoil";
import { Cookies, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [userID, setUserId] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  // console.log("로그인 여부", loggedIn);
  // console.log("accessToken 쿠키 값:", cookies.id);

  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (loggedIn) {
      setRemainingTime(3600);

      // Start the countdown timer
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [loggedIn]);

  useEffect(() => {
    if (remainingTime < 0 && loggedIn) {
      logoutEvent();
    }
  }, [remainingTime, loggedIn]);

  const logoutEvent = () => {
    setLoggedIn(false);
    removeCookie("id");

    console.log("accessToken 쿠키 값:", cookies.id);
    navigate("/login");
  };

  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoAndLogin}>
        <img className={styles.logo} src="/logo.png" alt="Logo" />

        {loggedIn && (
          <div>
            <span>로그아웃까지 남은 시간: {formatTime(remainingTime)}</span>
            <button style={{ marginLeft: "10px" }} onClick={logoutEvent}>
              로그아웃
            </button>
          </div>
        )}
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
