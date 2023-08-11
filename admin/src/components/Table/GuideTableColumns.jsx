import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGuideInfo } from "../../pages/StaffPages/StaffDetail";
import { Cookies, useCookies } from "react-cookie";

export const GuideTableCloumns = (setAllGuide) => [
  {
    Header: "ID",
    accessor: "guideCode",
  },
  {
    Header: "이름",
    accessor: "userName",
  },
  {
    Header: "이메일",
    accessor: "email",
  },
  {
    Header: "소개",
    accessor: "introduce",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const guideId = row.original.guide_db_id;
      const navigate = useNavigate();
      const [cookies, setCookie, removeCookie] = useCookies(["id"]);
      const handleDeleteGuide = (guideCode) => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        // console.log(guideCode);
        if (confirmDelete) {
          axios
            .get(`${process.env.REACT_APP_AMUSE_API}/test/api/delete/guide/${guideId}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: cookies.id,
              },
            })
            .then((res) => {
              console.log(res);
              getGuideInfo(setAllGuide);
            })
            .catch((err) => console.log(err));
        }
      };

      return <button onClick={() => handleDeleteGuide(guideId)}>삭제하기</button>;
    },
  },
];
