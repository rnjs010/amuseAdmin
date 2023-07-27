import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
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
    // TODO: 비밀번호 변경 API 호출 및 처리
    console.log("비밀번호 변경 클릭: ", email);
  } catch (error) {
    console.error("비밀번호 변경 에러:", error);
    // TODO: 에러 처리
  }
};

const handleDeleteAccount = async (email) => {
  try {
    // TODO: 계정 삭제 API 호출 및 처리
    console.log("삭제 클릭: ", email);
  } catch (error) {
    console.error("계정 삭제 에러:", error);
    // TODO: 에러 처리
  }
};

// {
//   Header: "Actions",
//   Cell: ({ row }) => {
//     const user_db_id = row.original.user_db_id;
//     const [cookies, setCookie, removeCookie] = useCookies(["id"]);
//     const handleAddManager = (user_db_id) => {
//       console.log(user_db_id);
//       console.log(accessToken);
//       axios
//         .get(
//           `https://amuseapi.wheelgo.net/api/v1/admin/accounts/all`,
//           {
//             roleType: "ADMIN",
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: cookies.id,
//             },
//           }
//         )
//         .then((res) => {
//           console.log(res);
//           alert("추가 성공");
//         })
//         .catch((err) => console.log(err));
//     };

//   return <button onClick={() => handleAddManager(user_db_id)}>추가하기</button>;
// },
// },
