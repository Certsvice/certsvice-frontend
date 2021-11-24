import styled from "styled-components";
import Web3 from "web3";

import Alert from "./Alert";

import { useEffect, useState } from "react";

import { AbiItem } from "web3-utils";
import { certsviceAddress, abi } from "./config";

import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, alertState } from "../store";
const Header = (porps: any) => {
  const [, setWalletObj] = useRecoilState(accountState);
  const [, serAlertObj] = useRecoilState(alertState);
  const alertObj = useRecoilValue(alertState);
  const walletObj = useRecoilValue(accountState);
  // const walletPhoto = useSelector(selectWalletPhoto);
  // const history = useHistory();

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const eth = web3.givenProvider;
  const certsvice = new web3.eth.Contract(abi as AbiItem[], certsviceAddress);

  const [dropClick, setDropClick] = useState(false);
  async function loadBlockchainData(fromBtn: boolean) {
    if (eth) {
      eth.on("accountsChanged", async (accounts: any) => {
        accounts = await web3.eth.getAccounts();
        if (accounts[0]) {
          isUniversity(accounts, false, true);
        }
      });
      eth.on("chainChanged", (chainId: any) => {
        window.location.reload();
      });
      console.log(eth.isConnected());
      let accounts: any;

      if (fromBtn) {
        await eth.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }],
        });
        accounts = await eth.request({ method: "eth_requestAccounts" });
        if (accounts[0]) {
          isUniversity(accounts, true, false);
        }
      } else {
        accounts = await web3.eth.getAccounts();
        console.log("else not from btn", accounts);
        if (accounts[0]) {
          isUniversity(accounts, false, false);
        }
      }
      // const accounts = await eth.request({ method: "eth_requestAccounts" });
      // const accounts = await web3.eth.getAccounts();
    } else {
      console.log("Please install MetaMask!");
    }
  }

  const isUniversity = async (
    accounts: string[],
    check: boolean,
    onEvent: boolean
  ) => {
    // if (!check && !onEvent) {
    //   await eth.request({
    //     method: "wallet_requestPermissions",
    //     params: [{ eth_accounts: {} }],
    //   });
    // }
    const showSuccess = () => {
      setWalletObj({
        wallet: accounts[0],
        photo: "",
      });
      serAlertObj({
        type: "",
        message: "",
        active: false,
      });
      if (check || onEvent) {
        console.log("alert from this?");
        serAlertObj({
          type: "Success",
          message: "Wallet Connect Success ",
          active: true,
        });
      }
    };
    const showFail = () => {
      disconnect();
      serAlertObj({
        type: "",
        message: "",
        active: false,
      });
      if (check || onEvent) {
        serAlertObj({
          type: "Alert",
          message: "Wallet Connect fail Your account not register",
          active: true,
        });
      }
    };
    const checkOwner = await certsvice.methods
      .getOwner()
      .call()
      .then((owner: string) => {
        console.log(accounts[0], owner);
        if (accounts[0].toLocaleLowerCase() === owner.toLocaleLowerCase()) {
          if (window.location.pathname !== "/addUniversity") {
            window.location.href = "/addUniversity";
          }
          console.log("if account == owner");
          return true;
        } else {
          console.log("if account != owner");
          return false;
        }
      })
      .then((alert: boolean) => {
        if (alert) {
          showSuccess();
        } else {
          if (window.location.pathname === "/addUniversity") {
            window.location.href = "/registry";
          }
        }
        return alert;
      });
    if (!checkOwner) {
      console.log("after check owner");
      certsvice.methods
        .getUniversity(accounts[0])
        .call()
        .then((uni: string) => {
          console.log(uni, "university");
          if (uni) {
            console.log("if case");
            showSuccess();
            signIn(accounts[0].toLocaleLowerCase(), uni);
          } else {
            console.log("else case");
            showFail();
          }
        });
    }
  };
  const signIn = (address: string, uni: string) => {
    const data = {
      address: address ?? "",
      universityName: uni ?? "",
    };
    console.log("data", data);
    const apiUrl = "http://localhost:8080/signin";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", "Bearer " + res.token);
        } else {
          serAlertObj({
            type: "Alert",
            message: "Sign in fail please check yoour account",
            active: true,
          });
        }
      });
  };
  async function connect() {
    loadBlockchainData(true);
  }

  async function disconnect() {
    setWalletObj({
      wallet: "",
      photo: "",
    });
    // if (window.location.pathname !== "/register") {
    //   window.location.href = "/register";
    // }
  }

  useEffect(() => {
    console.log("from use effect");
    window.location.pathname === "/"
      ? console.log("from use effect")
      : loadBlockchainData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Nav>
      <Container>
        {alertObj.active ? <Alert></Alert> : <></>}
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

        {window.location.pathname === "/" ? (
          <></>
        ) : !walletObj.wallet ? (
          <Login onClick={connect}>CONNECT WALLET</Login>
        ) : (
          <Login onClick={disconnect}>
            <img src="/images/metamask.svg" alt="Metamask"></img>{" "}
            {walletObj.wallet.slice(0, 6) + "..." + walletObj.wallet.slice(-4)}{" "}
          </Login>
        )}
      </Container>
    </Nav>
  );
};
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;

  margin-right: 1rem;
  margin-left: auto;

  a {
    display: flex;
    align-items: center;
    padding: 0px 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      font-size: 1rem;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(22, 22, 22);
        border-radius: 0px 0px 4px 4px;
        bottom: -2px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;

const DropdownMenu = styled.div`
  margin-top: 20px;
  display: block;
  position: absolute;
  left: -20px;
  background-color: #f9f9f9;
  border-radius: 9px;
  background: #e6e7ee;
  box-shadow: 5px 5px 5px #d1d2d9, -5px -5px 5px #fbfcff;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  z-index: 10;
  opacity: 0;
  animation: fadeShow 0.5s;

  @keyframes fadeShow {
    0% {
      display: none;
      opacity: 0;
    }

    1% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }
  ${NavMenu} {
    display: flex !important;
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    letter-spacing: 16px;
    a {
      padding: 0;
      margin: 4px 0px;
      span {
        letter-spacing: 0;
        margin-bottom: 2px;
      }
    }
  }
`;

const Dropdown = styled.div`
  cursor: pointer;
  position: relative;

  display: none;
  font-size: 1rem;
  margin-left: auto;
  margin-right: 1rem;
  height: auto;
  width: auto;
  span {
    display: flex;
    align-items: center;
    padding: 0 12px;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      font-size: 1rem;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
    }
  }
`;
const Logo = styled.a`
  width: auto;
  height: 48px;
  margin: 0px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-end;
  border-radius: 11px;
  background: #e6e7ee;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  img {
    display: block;
    width: 48px;
    padding: 3px;
    font-size: 1rem;
  }
  &:hover {
    border-radius: 50px;
    background: #e6e7ee;
    box-shadow: 50px 50px 100px #c4c4ca, -50px -50px 100px #ffffff;
  }
  h1 {
    margin: 0px 5px 0px 0px;
    font-weight: 300;
    font-size: 2.5rem;
  }
`;

const Login = styled.a`
  padding: 8px 8px;
  width: 185px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;

  letter-spacing: 1.5px;
  cursor: pointer;
  color: #31344b;
  transition: all 0.2s ease 0s;
  border-radius: 7px;
  background: #e6e7ee;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }
  &:hover {
    border-radius: 7px;
    background: #e6e7ee;
    box-shadow: inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #fff;
  }
`;

const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;

const Nav = styled.nav`
  background-color: #e6e7ee;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 90px;
  padding: 10px 0px;
  display: flex;
  align-items: center;
  width: 100vw;
  z-index: 3;
  box-shadow: 0;
  @media (min-width: 1280px) {
    ${Container} {
      max-width: 1280px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    ${Container} {
      max-width: 1024px;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    ${Container} {
      max-width: 768px;
    }
  }
  @media (max-width: 640px) {
    ${Container} {
      max-width: 640px;
    }
    ${NavMenu} {
      display: none;
    }
    ${Dropdown} {
      display: inline-block;
    }
  }
`;

export default Header;
