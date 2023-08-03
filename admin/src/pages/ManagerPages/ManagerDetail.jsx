import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ManagerDetail.module.css";
import { ManagerTableColumns } from "../../components/Table/ManagerTableColumns";
import Table from "../../components/Table/Table";
import { Cookies, useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isLoggedIn, accessToken } from "../../pages/atoms";

const ManagerDetail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["id"]);
  const [token, setToken] = useRecoilState(accessToken);
  // console.log("쿠키", cookies.id);
  const redirectU = "https://myadmin.wheelgo.net/manager";

  const addManager = async (event) => {
    if (email === "" || password === "") {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    event.preventDefault();
    console.log(email, password);

    const apiUrl = "https://devapi.wheelgo.net/api/v1/auth/signup";
    const requestData = {
      id: email,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, requestData);
      const data = response.data;
      console.log(data);
      setEmail("");
      setPassword("");
      if (data.code === 1000) {
        // 등록에 성공한 경우
        setInfo(email);
        alert("계정 추가 성공!");
        window.location.href = redirectU;
      } else if (data.status === 302) {
        alert(`${data.message}`); // 아이디 존재
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      // Handle API request error here
    }
  };

  const fetchAdminAccounts = async (token) => {
    setToken(cookies.id);
    console.log("fetch");
    try {
      const apiU = "https://devapi.wheelgo.net/api/v1/admin/accounts/all";
      const response = await axios.get(apiU, {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.id,
        },
      });
      console.log("manager detail 토큰:", cookies.id);
      const data = response.data;
      if (data.code === 1000 && data.data && data.data.accounts) {
        setInfo(data.data.accounts);
        setColumns(ManagerTableColumns(data.data.accounts));
        console.log(data.data.accounts);
      } else {
        // No accounts or other error
        setInfo([]);
      }
    } catch (error) {
      console.error("API 요청 에러:", error);
      setInfo([]);
    }
  };

  useEffect(() => {
    fetchAdminAccounts(token);
  }, []);

  const [columns, setColumns] = useState(ManagerTableColumns(info));
  const data = info.map((email, index) => ({
    id: index,
    email: email,
  }));
  return (
    <div style={{ margin: "18px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eb1749",
          margin: "30px 50px 0px 50px",
          paddingBottom: 10,
        }}
      >
        <h2> Admin 계정 관리 </h2>
      </div>
      {/* info 상태값으로 받아온 데이터 출력 */}

      <div style={{ padding: "20px" }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.guideBtn} style={{ marginLeft: "20px" }} onClick={addManager}>
          관리자로 추가
        </button>
      </div>
      <div>{info && Array.isArray(info) ? <Table columns={columns} data={data} /> : <p>정보 없음.</p>}</div>
    </div>
  );
};

export default ManagerDetail;
