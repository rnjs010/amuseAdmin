import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getGuideInfo } from "../../pages/StaffPages/StaffDetail";

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
      const guideCode = row.original.guideCode;
      const navigate = useNavigate();

      const handleDeleteGuide = (guideCode) => {
        console.log(guideCode);
        axios
          .get(`https://amuseapi.wheelgo.net/test/api/delete/guide/${guideCode}`)
          .then((res) => {
            console.log(res);
            getGuideInfo(setAllGuide);
          })
          .catch((err) => console.log(err));
      };

      return <button onClick={() => handleDeleteGuide(guideCode)}>삭제하기</button>;
    },
  },
];
