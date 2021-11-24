import { atom } from "recoil";

export const accountState = atom({
  key: "accountState",
  default: {
    wallet: "",
    photo: "",
  },
});

export const alertState = atom({
  key: "alertState",
  default: {
    type: "Success",
    message: "",
    active: false,
  },
});
