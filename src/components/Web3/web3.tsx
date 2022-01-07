import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { certsviceAddress, abi } from "./web3.config";

export const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
export const eth = web3.givenProvider;
export const certsvice = new web3.eth.Contract(
  abi as AbiItem[],
  certsviceAddress
);

export const getBalance = async (account: string) => {
  const balance = await web3.eth.getBalance(account);
  return await web3.utils.fromWei(balance, "ether");
};
export const getAccount = async (inject: boolean) => {
  const accounts = inject
    ? await eth.request({ method: "eth_requestAccounts" })
    : await web3.eth.getAccounts();
  return accounts[0] ? accounts[0].toLowerCase() : "";
};

export const getChain = async () => {
  return await eth.request({ method: "eth_chainId" });
};
export const changeChain = async () => {
  await eth.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0x3" }],
  });
};

export const onAccounstChanged = () => {
  eth.on("accountsChanged", async () => {
    window.location.reload();
  });
};

const getOwner = async () => {
  const owner = await certsvice.methods.getOwner().call();
  // .then((owner: string) => {
  //   if (!accounts) {
  //     return false;
  //   }
  //   if (accounts.toLocaleLowerCase() === owner.toLocaleLowerCase()) {
  //     if (window.location.pathname !== "/addUniversity") {
  //       window.location.href = "/addUniversity";
  //     }
  //     console.log("if account == owner");
  //     return true;
  //   } else {
  //     console.log("if account != owner");
  //     return false;
  //   }
  // })
  // .then((alert: boolean) => {
  //   console.log(alert);
  //   if (alert) {
  //     return alert;
  //   } else {
  //     if (window.location.pathname === "/addUniversity") {
  //       window.location.href = "/registry";
  //     }
  //   }
  //   return alert;
  // });

  return owner + "";
};

export const getUniversity = async (account: string) => {
  return await certsvice.methods.getUniversity(account).call();
};

export const checkRole = async (account: string) => {
  if (!account) return;
  const owner = await getOwner();
  const isOwner = owner.toLowerCase() === account.toLowerCase();
  if (!isOwner) {
    const university = await getUniversity(account);
    return (await getUniversity(account))
      ? { type: "university", name: university }
      : { type: "empty", name: "" };
  } else {
    return { type: "owner", name: "" };
  }
};
