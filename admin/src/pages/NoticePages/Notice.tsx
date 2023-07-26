import React, { useEffect, useState } from "react";
import styles from "../../components/Notice/Notice.module.css";
import Table from "../../components/Table/Table";
import { NoticeTableColumns } from "../../components/Table/NoticeTableColumns";

import { useNavigate } from "react-router-dom";
import axios from "axios";

type NoticeInfo = {
  id: Number | null;
  title: String | null;
  createdAt: Date | null;
  createdBy: String | null;
  updatedAt: Date | null;
  updatedBy: String | null;
};

const Notice = () => {
  const navigate = useNavigate();

  const [noticeListArr, setNoticeListArr] = useState<NoticeInfo[]>([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`https://amuseapi.wheelgo.net/test/api/notice/getList?offset=0&limit=10&page=1`)
        .then((r) => {
          const res = r.data.data;
          setNoticeListArr(res.data);
        })
        .catch((e) => console.log(e));
    })();
  }, []);

  return (
    <div className={styles.container}>
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
        <h2> 공지사항 </h2>

        <button className={styles.button} onClick={() => navigate("/notice/register")}>
          등록하기
        </button>
      </div>

      <div style={{ paddingTop: 30 }}>
        <Table route={"notice"} columns={NoticeTableColumns} data={noticeListArr} />
      </div>
    </div>
  );
};

export default Notice;
