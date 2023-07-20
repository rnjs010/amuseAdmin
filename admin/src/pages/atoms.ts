import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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
