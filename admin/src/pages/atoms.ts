import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
// import { Cookies, useCookies } from "react-cookie";
// import { useState } from "react";

const { persistAtom } = recoilPersist();

export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const isManager = atom<boolean>({
  key: "isManager",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const accessToken = atom<string>({
  key: "accessToken",
  default: "", // 초기값은 빈 문자열로 설정
  effects_UNSTABLE: [persistAtom],
});
