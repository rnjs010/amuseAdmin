import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "./atoms";

function DashBoard() {
  // useEffect(() => {
  //   let token: string | null = new URL(window.location.href).searchParams.get("token");
  //   if (token == null) {
  //     return;
  //   } else {
  //     localStorage.setItem("loginToken", token);
  //   }
  // }, [])
  return <div>DashBoard</div>;
}

export default DashBoard;
