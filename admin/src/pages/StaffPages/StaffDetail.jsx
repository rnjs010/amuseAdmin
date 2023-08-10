import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import GuideModal from "./GuideModal";
import axios from "axios";
// import styles from "./StaffDetail.module.css";
import Table from "../../components/Table/Table";
import { GuideTableCloumns } from "../../components/Table/GuideTableColumns";

export const getGuideInfo = (setAllGuide) => {
  axios
    .get(`https://devapi.wheelgo.net/test/api/list/guide?page=1&limit=200`)
    .then((res) => {
      console.log(res);
      setAllGuide(res.data.data.guideInfo);
    })
    .catch((err) => console.log(err));
};

const StaffDetail = () => {
  const [allGuide, setAllGuide] = useState();

  useEffect(() => {
    getGuideInfo(setAllGuide);
  }, []);

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
        <h2> 가이드 관리 </h2>
        <GuideModal getGuideInfo={getGuideInfo} setAllGuide={setAllGuide} />
      </div>
      <div style={{ marginTop: "30px" }}>
        {allGuide && allGuide.length > 0 ? (
          <Table columns={GuideTableCloumns(setAllGuide)} data={allGuide} />
        ) : (
          <p>가이드 불러오는 중</p>
        )}
      </div>
    </div>
  );
};

export default StaffDetail;
