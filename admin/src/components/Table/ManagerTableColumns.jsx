import axios from "axios";

const accessToken = localStorage.getItem("loginToken");

export const ManagerTableColumns = () => [
  {
    Header: "ID",
    accessor: "email",
  },
  {
    Header: "유저 이름",
    accessor: "userName",
  },
  {
    Header: "권한",
    accessor: "roleType",
  },
  {
    Header: "고유번호",
    accessor: "user_db_id",
  },
  {
    Header: "구분",
    accessor: "providerType",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const user_db_id = row.original.user_db_id;

      const handleAddManager = (user_db_id) => {
        console.log(user_db_id);
        console.log(accessToken);
        axios
          .post(
            `https://amuseapi.wheelgo.net/api/v1/admin/update-role/${user_db_id}`,
            {
              roleType: "ADMIN",
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            alert("ADMIN 권한을 부여하였습니다");
          })
          .catch((err) => console.log(err));
      };

      return <button onClick={() => handleAddManager(user_db_id)}>추가하기</button>;
    },
  },
];
