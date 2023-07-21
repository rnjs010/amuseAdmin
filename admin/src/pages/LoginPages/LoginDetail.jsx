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

const LoginDetail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  const navigate = useNavigate();
  const redirectU = "http://myadmin.wheelgo.net/product";

  useEffect(() => {
    let token = new URL(window.location.href).searchParams.get("token");
    if (token == null) {
      setLoggedIn(false);
      return;
    } else {
      localStorage.setItem("loginToken", token);
      setLoggedIn(true);
    }
  }, []);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
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
            <img className="amuse_logo" src="http://cdn.amusetravel.com/assets/headers/logo.png" alt="어뮤즈 이미지" />
            <h2 className="amuse_title_top">모두가 즐거운 여행</h2>
            <h2 className="amuse_title_bottom">어뮤즈 트래블</h2>
          </div>
        </form>
        <div className="v_box">
          <div className="OAuth">
            <a
              className="login_google"
              href={`http://vikrant.store/oauth2/authorization/google?redirect_uri=${redirectU}`}
            >
              <GoogleIcon sx={{ mr: 4 }} />
              Google 로그인
            </a>
            <a
              className="login_naver"
              href={`http://vikrant.store/oauth2/authorization/naver?redirect_uri=${redirectU}`}
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKgAAACoCAMAAABDlVWGAAAAaVBMVEUdyAD///+L43w7zyIqyw/g99x33mZZ10T3/fbr+uj1/fT5/fjx/O/7/vvs+uo2zhyQ5IJr21jk+ODQ9MrZ9tSr66Bn2lO57rDD8Lt53miF4XVF0i3U9c9O1Dec549X1kGj6ZfF8b6t66KEKOH9AAAB+klEQVR4nO3b6U4CURBE4W5nANlk3wXE939IFZAMRO5CcLorqfPXTPyUmFSjijDGGGOMMcYYY4wxxhhjjDHGGPPfoAg2CD4cfrYonwlta7hW4Nky8uxLndBx4NviCqozFKjOUaBvd3+gaoW+RaG6QIHqCAXau/Piu4PqEgWqKxRopzCH9pKgOkGB6hoF2t2AQPUdBapDFGh/CwLV6e009QrVnSW0kwHt70Ggt3eJX+jNXeIYen2Ueoa2qy++Z+jVXeIaWr1LaoW+5kIrd4lvaOUucQ7VJgr0cpfUCu3mQy93iXvo713iH3q+S/xDz3cJAPRkQIAe75Jaof3HoMe7BAL6c5dgQL/vEgyoNkoQqH6gQHXkCDqeBD4Ye2+1TmijeGBe/Qs08rkaskKByhIFOsh5e8oSKk0UqCxQoGX8N7s+oDJHgcoMBVqOQaCyf2QTWEBlhwKVKQp0k//i20BliAKV0DR1Bc2eplZQWaNA5YACzZymdtDMafpMaOw0v4HmTVNLaNY0tYRmTVNTqHyiQDOmqS1UWijQ9GlqDU2epubQbeI0NYemTlN7aOI0dQDdJE1TB9C0aeoBKgcUaJHwVzMuoCnT1Ac0YZo6gcanqRNofJp6gUan6VOPu2a4e/94c/oqW+H+/HcIxhhjjDHGGGOMMcYYY4yxZ/YFDqQnVn2hF8AAAAAASUVORK5CYII="
                alt="네이버 로고"
                className="naver_logo"
              />
              Naver 로그인
            </a>
            <a
              className="login_kakao"
              href={`http://vikrant.store/oauth2/authorization/kakao?redirect_uri=${redirectU}`}
            >
              <img
                src="data:image/jpeg;base64,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"
                alt="카카오 로고"
                className="kakao_logo"
              />
              KaKao 로그인
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginDetail;
