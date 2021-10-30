import styled from "styled-components";
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectWalletAddress,
  selectWalletPhoto,
  setAccountConectDetails,
  setAccountDisconectState,
} from "../features/user/accountSlice";
import { injected } from "./Connectors";

const Header = (porps: any) => {
  const { library, connector, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();
  const walletAddress = useSelector(selectWalletAddress);
  const walletPhoto = useSelector(selectWalletPhoto);
  const history = useHistory();

  const [dropClick, setDropClick] = useState(false);

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      dispatch(
        await setAccountConectDetails({
          wallet: accounts[0],
          photo: "aaa",
        })
      );
    }
  }

  async function connect() {
    try {
      await activate(injected);
      loadBlockchainData();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    deactivate();
    setAccountDisconectState();
  }

  useEffect(() => {
    loadBlockchainData();

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
        ) : !walletAddress ? (
          <Login onClick={connect}>Connect Wallet</Login>
        ) : (
          <Login onClick={disconnect}>
            <img src="/images/metamask.svg" alt="Metamask"></img>{" "}
            {walletAddress.slice(0, 6) +
              "..." +
              walletAddress.slice(
                walletAddress.length - 4,
                walletAddress.length
              )}{" "}
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
  box-shadow: 5px 5px 5px #c4c4ca, -5px -5px 5px #ffffff;
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
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  color: #31344b;
  transition: all 0.2s ease 0s;
  border-radius: 7px;
  background: #e6e7ee;
  box-shadow: 5px 5px 10px #adadb3, -5px -5px 10px #ffffff;
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    z-index: auto;
  }
  &:hover {
    border-radius: 7px;
    background: #e6e7ee;
    box-shadow: inset 5px 5px 10px #adadb3, inset -5px -5px 10px #ffffff;
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
