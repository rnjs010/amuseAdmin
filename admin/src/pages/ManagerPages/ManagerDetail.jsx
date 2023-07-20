import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ManagerDetail.module.css";
import { ManagerTableColumns } from "../../components/Table/ManagerTableColumns";
import Table from "../../components/Table/Table";

const ManagerDetail = () => {
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [info, setInfo] = useState();

  const checkManager = () => {
    const accessToken = localStorage.getItem("loginToken");
    axios
      .get(`http://vikrant.store/api/v1/admin/search/users?email=${email}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEmailExists(true);
        alert("관리자로 추가 가능한 이메일 입니다.");
        setInfo(response.data.data);
      })
      .catch((error) => {
        alert("존재하지 않는 이메일 입니다.");
        console.error(error);
        setEmailExists(false);
      });
  };

  const addManager = () => {
    setEmailExists(false);
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
        <h2> 권한 관리 </h2>
      </div>
      <div>{/* {info && } */}</div>
      <div style={{ padding: "20px" }}>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.guideBtn} style={{ marginLeft: "20px" }} onClick={checkManager}>
          이메일 확인
        </button>
      </div>
      <div>{info && info.length > 0 ? <Table columns={columns} data={info} /> : <p>정보 없음.</p>}</div>
    </div>
  );
};

export default ManagerDetail;
