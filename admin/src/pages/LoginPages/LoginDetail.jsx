import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./LoginDetail.css";
import "./LoginDetail.css";
import Header from "../../components/Header/Header";
import { Link, redirect, useSearchParams } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../atoms";
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

// export const getCookie = (token) => {
//   return cookies.get(token);
// };

const LoginDetail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();
  const redirectU = "http://localhost:3000/"; //"https://myadmin.wheelgo.net/product";
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const axiosWithRedirects = axios.create({
    maxRedirects: 10, // 리다이렉션 허용 설정
  });

  const loginEvent = async (event) => {
    event.preventDefault();

    const apiUrl = `https://amuseapi.wheelgo.net/api/v1/auth/login?id=${email}&password=${password}`;

    try {
      const response = await axiosWithRedirects.get(apiUrl);
      // console.log(response);
      const data = response.data;
      console.log(email, password);
      if (data.code === 1000) {
        // 로그인에 성공한 경우
        setLoggedIn(true);
        alert("로그인 성공!");
        setCookie("id", data.data.accessToken); // "accessToken" 쿠키에 데이터의 accessToken 값을 설정

        console.log("로그인 성공 쿠키 값:", cookies.id);

        window.location.href = redirectU;
      } else if (data.status === 451) {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      // Handle API request error here
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  //   console.log("로그인 여부", loggedIn);

  useEffect(() => {
    if (loggedIn) {
      alert("이미 로그인 하였습니다.");
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="login_body">
        <form className="login" action="/loginURL" method="post">
          <div className="amuse_login_title">
            <img className="amuse_logo" src="https://cdn.amusetravel.com/assets/headers/logo.png" alt="어뮤즈 이미지" />
            <h2 className="amuse_title_top">모두가 즐거운 여행</h2>
            <h2 className="amuse_title_bottom">어뮤즈 트래블</h2>
          </div>
          <div className="input">
            <div className="email">
              <EmailInput email={email} handleChangeEmail={handleChangeEmail} />
            </div>
            <div className="password">
              <PasswordInput password={password} handleChangePassword={handleChangePassword} />
            </div>
          </div>
          <div className="login_btn_box">
            <button className="login_btn" onClick={loginEvent}>
              <i className="fa-solid fa-door-open"></i>로그인
            </button>
          </div>
        </form>
        <div className="v_box"></div>
      </div>
    </>
  );
};

export default LoginDetail;
