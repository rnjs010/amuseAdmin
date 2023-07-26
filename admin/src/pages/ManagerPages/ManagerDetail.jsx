import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ManagerDetail.module.css";
import { ManagerTableColumns } from "../../components/Table/ManagerTableColumns";
import Table from "../../components/Table/Table";

const ManagerDetail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState();

  // const addManager = () => {
  //   const accessToken = localStorage.getItem("loginToken");

  // axios
  //   .get(`https://amuseapi.wheelgo.net/api/v1/admin/search/users?email=${email}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   })
  //   .then((response) => {
  //     console.log(response.data.data);
  //     setEmailExists(true);
  //     alert("관리자로 추가합니다.");
  //     setInfo(response.data.data);
  //   });
  // };

  const redirectU = "https://myadmin.wheelgo.net/manager";

  const addManager = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const apiUrl = "https://ammuse.store/api/v1/auth/signup";
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
        // 로그인에 성공한 경우
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
  const columns = ManagerTableColumns();
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
      <div>{info && info.length > 0 ? <Table columns={columns} data={info} /> : <p>정보 없음.</p>}</div>
    </div>
  );
};

export default ManagerDetail;
