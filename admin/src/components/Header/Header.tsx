import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { isLoggedIn, accessToken } from "../../pages/atoms";
import { useRecoilState } from "recoil";
import { Cookies, useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [timeCookies, setTimeCookie, removeTimeCookie] = useCookies(["remainTime"]);
  const [userID, setUserId] = useState(null);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const [token, setToken] = useRecoilState(accessToken);
  // const [remainingTime, setRemainingTime] = useState(() => {
  //   const storedTime = localStorage.getItem("remainingTime");
  //   return storedTime ? parseInt(storedTime, 10) : 0;
  // });

  const [remainingTime, setRemainingTime] = useState(() => {
    const storedTime = parseInt(timeCookies.remainTime, 10);
    return !isNaN(storedTime) ? storedTime : 0;
  });

  useEffect(() => {
    if (loggedIn) {
      console.log("header 쿠키", cookies.id);
      console.log("header 토큰", token);
      if (remainingTime === 0) setRemainingTime(9000);

      // 타이머 시작
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          // remainingTime을 로컬 스토리지에 저장
          localStorage.setItem("remainingTime", String(prevTime));
          setTimeCookie("remainTime", String(prevTime), { path: "/" });
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [loggedIn]);

  const checkAdminAccounts = async (token: any) => {
    console.log("요청보낸 토큰:", cookies.id);
    try {
      const apiU = "https://devapi.wheelgo.net/api/v1/auth/refresh";
      const response = await axios.get(apiU, {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.id,
        },
      });

      const data = response.data;
      console.log(data);
      if (data.data) {
        setToken(data.data.token);
        console.log("새로운 토큰", data.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.log("토큰 갱신 에러:", error);
      console.log(token);
      return false;
    }
  };

  // useEffect(() => {
  //   const refreshAdminToken = async () => {
  //     const tokenRefreshed = await checkAdminAccounts(token);

  //     if (tokenRefreshed) {
  //       setCookie("id", token);
  //     }
  //   };
  //   refreshAdminToken();
  // }, []);

  useEffect(() => {
    if (remainingTime < 0 && loggedIn) {
      logoutEvent();
    }
    if(!cookies.id){
      logoutEvent();
    }
  }, [remainingTime, loggedIn]);

  const logoutEvent = () => {
    setLoggedIn(false);
    removeCookie("id");
    removeTimeCookie("remainTime");
    // console.log("accessToken 쿠키 값:", cookies.id);
    navigate("/login");
  };

  const tokenEvent = () => {};

  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (loggedIn && location.pathname !== "/login") {
        setShowConfirmation(true);
        event.preventDefault();
        event.returnValue = ""; // Required for Chrome
      }
    };

    if (loggedIn && location.pathname !== "/login") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (loggedIn && location.pathname !== "/login") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, [loggedIn, location]);

  return (
    <div className={styles.header}>
      <div className={styles.logoAndLogin}>
        <img className={styles.logo} src="/logo.png" alt="Logo" />

        {loggedIn && (
          <div>
            <span>로그아웃까지 남은 시간: {formatTime(remainingTime)}</span>
            {/* <button style={{ marginLeft: "10px", border: "1px solid black", padding: "10px" }} onClick={tokenEvent}>
              토큰 갱신
            </button> */}
            <button style={{ marginLeft: "10px", border: "1px solid black", padding: "10px" }} onClick={logoutEvent}>
              로그아웃
            </button>
          </div>
        )}
      </div>
      <div className={styles.category}>
        <button onClick={() => (loggedIn ? navigate("/") : navigate("/login"))}>여행 상품 관리</button>
        <button onClick={() => (loggedIn ? navigate("/staff") : navigate("/login"))}>가이드 관리</button>
        <button onClick={() => (loggedIn ? navigate("/componentV2") : navigate("/login"))}>컴포넌트 관리(V2)</button>
        <button onClick={() => (loggedIn ? navigate("/page") : navigate("/login"))}>페이지 관리</button>
        <button onClick={() => (loggedIn ? navigate("/manager") : navigate("/login"))}>권한 관리</button>
        <button onClick={() => navigate("/login")}>로그인</button>

        {/*<button onClick={() => navigate('/component')}> 컴포넌트 관리 </button>*/}
        {/*<button onClick={() => navigate('/category')}>카테고리 관리</button>*/}
        {/*<button onClick={() => navigate('/ad')}>광고 관리</button>*/}
      </div>
    </div>
  );
}

export default Header;
