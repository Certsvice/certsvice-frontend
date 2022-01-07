import {
  Nav,
  Container,
  Login,
  Logo,
  Dropdown,
  DropdownMenu,
  NavMenu,
  Address,
} from "./header.style";
import {
  eth,
  onAccounstChanged,
  changeChain,
  getAccount,
  checkRole,
  getChain,
  getBalance,
} from "../Web3/web3";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useResetRecoilState } from "recoil";
import { accountState, alertState } from "../../store";
const Header = () => {
  const [walletObj, setWalletObj] = useRecoilState(accountState);
  const resetWallet = useResetRecoilState(accountState);
  const [alertObj, setAlertObj] = useRecoilState(alertState);
  // // const walletPhoto = useSelector(selectWalletPhoto);
  // // const history = useHistory();
  const [dropClick, setDropClick] = useState(false);

  const showSuccess = (msg: string) => {
    setAlertObj({
      type: "Success",
      header: "Login",
      msg: "Welcome",
      message: msg,
      active: true,
    });
  };
  const showFail = (msg: string) => {
    setAlertObj({
      type: "Fail",
      header: "Login",
      msg: "Sorry",
      message: msg,
      active: true,
    });
  };

  const onChainChanged = () => {
    eth.on("chainChanged", async () => {
      const chainId = await getChain();
      if (!(chainId === "0x3")) {
        resetWallet();
      }
    });
  };
  const ConnectToBlockchain = async (clickConnect: boolean) => {
    if (eth) {
      if (clickConnect) {
        await changeChain();
        const account = await getAccount(true);
        if (account) {
          localStorage.setItem("address", account);
          localStorage.removeItem("disconnect");
          const balance = await getBalance(account);

          setWalletObj({
            address: account,
            balance: balance,
          });
          const role = await checkRole(account);
          if (role?.type === "owner") {
            // showSuccess("Contract Owner");
          } else if (role?.type === "university") {
            // showSuccess(`${role.name}`);
          } else {
            // showFail("Your account not registry or waiting for verify");
          }
        }
      } else {
        const disconnect = localStorage.getItem("disconnect");
        if (!disconnect) {
          const chainId = await getChain();
          const account = await getAccount(false);
          if (account && chainId === "0x3") {
            localStorage.setItem("address", account);
            const balance = await getBalance(account);
            setWalletObj({
              address: account,
              balance: balance,
            });
            const role = await checkRole(account);
            if (role?.type === "owner") {
            } else if (role?.type === "university") {
            } else {
            }
          }
        }
      }
      checkStatus();
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
  });
  const signIn = () => {
    const address = localStorage.getItem("address");
    if (address) {
      api.post("/signin", { address: address }).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      });
    }
  };
  const checkStatus = async () => {
    if (localStorage.getItem("address")) {
      api
        .get(`/status/${localStorage.getItem("address")}`)
        .then(async (res) => {
          console.log(res.data, "res");
          console.log(res);
          const status = res.data.status;

          if (status !== "notFound") {
            if (status === "true") {
              // window.location.href = "/register";
            } else {
              if (window.location.pathname !== "/waiting") {
                window.location.href = "/waiting";
                // await waitAlert;
              }
            }
          } else {
            if (window.location.pathname !== "/signup") {
              window.location.href = "/signup";
              // await waitAlert;
            }
          }
        });
    }
  };
  async function connect() {
    await ConnectToBlockchain(true);
    await signIn();
  }
  async function disconnect() {
    resetWallet();
    localStorage.removeItem("token");
    localStorage.removeItem("address");
    localStorage.setItem("disconnect", "true");
    if (window.location.pathname !== "/signup") {
      window.location.href = "/signup";
    }
  }

  useEffect(() => {
    if (eth) {
      onAccounstChanged();
      onChainChanged();
    }
    if (!(window.location.pathname === "/")) {
      ConnectToBlockchain(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Nav>
      <Container>
        <Logo href="/">
          <img src="/images/logoCertsvice.svg" alt="Certsvise"></img>
          {/* <h1>ertsvise</h1> */}
        </Logo>

        <Dropdown onClick={() => setDropClick(!dropClick)}>
          {dropClick ? (
            <>
              <span>
                <span>Menu</span>
                <img
                  src="/images/expand.svg"
                  alt="MENU"
                  style={{ transform: "rotate(0deg)", transition: "all 0.5s" }}
                ></img>
              </span>
              <DropdownMenu style={{ opacity: "1" }}>
                <NavMenu>
                  <a href="/registry">
                    <img
                      src="https://img.icons8.com/ios-filled/20/000000/order-history.png"
                      alt="REGISTRY"
                    />
                    <span>REGISTRY</span>
                  </a>
                  <a href="/faq">
                    <img
                      src="https://img.icons8.com/ios-glyphs/20/000000/faq.png"
                      alt="FAQ"
                    />
                    <span>FAQ</span>
                  </a>
                </NavMenu>
              </DropdownMenu>
            </>
          ) : (
            <>
              <span>
                <span>Menu</span>
                <img
                  src="/images/expand.svg"
                  alt="MENU"
                  style={{
                    transform: "rotate(-180deg)",
                    transition: "all 0.5s",
                  }}
                ></img>
              </span>
            </>
          )}
        </Dropdown>
        <NavMenu>
          <a href="/signup">
            <img
              src="https://img.icons8.com/ios-filled/20/000000/order-history.png"
              alt="SIGNUP"
            />
            <span>SIGNUP</span>
          </a>
          <a href="/faq">
            <img
              src="https://img.icons8.com/ios-glyphs/20/000000/faq.png"
              alt="FAQ"
            />
            <span>FAQ</span>
          </a>
        </NavMenu>

        {window.location.pathname === "/" ? (
          <></>
        ) : !walletObj.address ? (
          <Login>
            <Address onClick={connect}>
              <span>CONNECT WALLET</span>
            </Address>
          </Login>
        ) : (
          <Login>
            <span>{walletObj.balance.slice(0, 5)} ETH</span>
            <Address onClick={disconnect}>
              <img src="/images/metamask.svg" alt="Metamask"></img>
              <span>
                {walletObj.address.slice(0, 6) +
                  "..." +
                  walletObj.address.slice(-4)}{" "}
              </span>
            </Address>
          </Login>
        )}
      </Container>
    </Nav>
  );
};

export default Header;
