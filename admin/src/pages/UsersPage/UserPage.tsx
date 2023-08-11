import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import _ from "lodash";
import {
  CBadge,
  CButton,
  CCallout,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalHeader,
  CPagination,
  CRow,
} from "@coreui/react";
import { Table } from "react-bootstrap";
import axiosInstance from "../../services/axiosInstance";
import Paging from "./Pageing";
import EditView from "./EditView";

const UserPage = () => {
  const [modalStatus, setModalStatus] = useState(false); //
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [edit, setEdit] = useState(<></>);

  const slicingNumber = 12; // 한번에 보여주는 최대 item 수
  const [slicedArray, setSlicedArray] = useState(slicingArray(users, slicingNumber)); // page number 클릭시 보여주는 list
  const [pageNumber, setPageNumber] = useState(1); // page number
  const max = Math.ceil(users.length / slicingNumber); // max page number

  useEffect(() => {
    axiosInstance
      .get("/api/v1/user/all/info")
      .then((response) => {
        const userData = response.data.data;
        let users = userData?.userInfos || [];
        setUsers(users);
        setSlicedArray(slicingArray(users, slicingNumber));
        console.log(slicingArray(users, slicingNumber));

        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [count]);

  const userRankModalControll = (user: any) => {
    setModalStatus(true);
    setEdit(
      <EditView
        user={user}
        count={count}
        setCount={setCount}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      ></EditView>
    );
  };
  const userRankModalCancel = () => {
    setModalStatus(false);
  };
  return (
    <CContainer fluid style={{ margin: 40, position: "relative" }}>
      <CCol style={{ marginBottom: 40 }}>
        <CCallout color="info" style={{ marginBottom: 12, marginLeft: 4 }}>
          <small className="text-muted" style={{ marginRight: 12 }}>
            고객 계정 수
          </small>
          <strong className="h4">{users.length}</strong>
        </CCallout>

        <CCard>
          <CCardBody>
            <Table striped bordered hover>
              <thead style={{ borderBottom: "4px solid #e2e2e2" }}>
                <tr>
                  <th>No</th>
                  <th>고객</th>
                  <th>이메일</th>
                  <th>계정 등급</th>
                </tr>
              </thead>
              <tbody>
                {/* {slicedArray[pageNumber - 1].length > 0 &&
                    slicedArray[pageNumber - 1].map((item, index) => ( */}
                {slicedArray.length > 0 &&
                  slicedArray[pageNumber - 1].length > 0 &&
                  slicedArray[pageNumber - 1].map((item: any, index: number) => (
                    <tr
                      key={index}
                      onClick={() => {
                        userRankModalControll(item);
                      }}
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.grade}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </CCardBody>
        </CCard>
      </CCol>
      <div style={{ marginTop: 10 }}>
        <Paging max={max} width={"100%"} minWidth={"650px"} num={pageNumber} setNum={setPageNumber} />
      </div>
      {modalStatus && (
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            zIndex: 10,
            borderRadius: 12,
          }}
        >
          <ButtonWrapper onClick={userRankModalCancel}>취소</ButtonWrapper>
          <div style={{ position: "sticky", top: 15, marginLeft: "50px", marginTop: "65px", zIndex: 99 }}>{edit}</div>
        </div>
      )}
    </CContainer>
  );
};
export default UserPage;

const slicingArray = (array: any, num: number) => {
  let len = array.length;
  let result = [];
  let itemBox = [];
  let index = 0;
  let nextIndex = num;
  while (index < len) {
    let sort1 = _.sortBy(array, "email");
    let sort2 = _.sortBy(sort1, "persistent").reverse();
    itemBox = _.slice(sort2, index, nextIndex);
    index = index + num;
    nextIndex = nextIndex + num;
    result.push(itemBox);
  }
  return result;
};

const ButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-evenly;
  align-items: center;
  font-size: 13px;
  width: 72px;
  height: 42px;
  background-color: #eb3e6c;
  margin: 8px;
  color: #fff;
  curser: pointer;
  border-radius: 12px;

  &:hover {
    background-color: #e2e2e2;
    color: #eb3e6c;
  }
`;
