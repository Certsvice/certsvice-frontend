import { atom, selector } from "recoil";

export const accountState = atom({
  key: "accountState",
  default: {
    address: "",
    balance: "",
  },
});

export const alertState = atom({
  key: "alertState",
  default: {
    type: "",
    header: "",
    msg: "",
    message: "",
    active: false,
  },
});
