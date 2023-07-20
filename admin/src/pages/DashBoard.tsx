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
  const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
  setLoggedIn(false);
  return <div>DashBoard - 로그아웃됨</div>;
}

export default DashBoard;
