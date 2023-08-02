import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import Modal from "react-modal";
import { useState } from "react";

const accessToken = localStorage.getItem("loginToken");

export const ManagerTableColumns = (info) => [
  {
    Header: "ID",
    accessor: "email",
  },
  {
    Header: "비밀번호 변경",
    Cell: ({ row }) => <button onClick={() => handleChangePassword(row.original.email)}>비밀번호 변경</button>,
  },
  {
    Header: "삭제",
    Cell: ({ row }) => <button onClick={() => handleDeleteAccount(row.original.email)}>삭제</button>,
  },
];

const handleChangePassword = async (email) => {
  try {
    // setNewPasswordModalOpen(true);
    console.log("비밀번호 변경 클릭: ", email);
  } catch (error) {
    console.error("비밀번호 변경 에러:", error);
  }
};

const handleDeleteAccount = async (email) => {
  try {
    console.log("삭제 클릭: ", email);

    const apiUrl = `https://devapi.wheelgo.net/api/v1/auth/withdraw?id=${email}`;
    const response = await axios.delete(apiUrl);

    console.log("삭제 응답 데이터:", response.data);
  } catch (error) {
    console.error("계정 삭제 에러:", error);
  }
};

function ManagerTable() {
  const [newPasswordModalOpen, setNewPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태 관리
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSaveNewPassword = async () => {
    try {
      const apiUrl = "https://devapi.wheelgo.net/api/v1/auth/password/change";
      const requestBody = { password: newPassword };
      const response = await axios.post(apiUrl, requestBody);

      setNewPasswordModalOpen(false);
    } catch (error) {
      console.error("새 비밀번호 저장 에러:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={newPasswordModalOpen} onRequestClose={() => setNewPasswordModalOpen(false)}>
        <h2>새로운 비밀번호 입력</h2>
        <input type="password" value={newPassword} onChange={handleNewPasswordChange} />
        <button onClick={handleSaveNewPassword}>저장</button>
        <button onClick={() => setNewPasswordModalOpen(false)}>취소</button>
      </Modal>
    </div>
  );
}
