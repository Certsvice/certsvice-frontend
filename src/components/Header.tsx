import styled from "styled-components";
import Web3 from "web3";
import { useEffect } from "react";
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
    console.log(accounts[0]);
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
    console.log("disconnect ", walletAddress);
  }
  useEffect(() => {
    loadBlockchainData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Nav>
      <Logo href="/">
        <img src="/images/logoCertsvice.svg" alt="Certsvise"></img>
      </Logo>
      {walletAddress ? (<><NavMenu>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </a>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </a>
        <a href="/home">
          <img src="/images/home-icon.svg" alt="HOME" />
          <span>HOME</span>
        </a>
      </NavMenu> </>) : (<></>)}
      
      {!walletAddress ? (
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
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #e6e7ee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 350px 0px;
  letter-spacing: 16px;
  z-index: 3;
  @media (max-width: 768px) {
    padding: 16px 36px;
  }
`;

const Logo = styled.a`
  padding: 0;
  width: 48px;
  height: 48px;
  margin-top: 0px;
  font-size: 0;
  display: inline-block;
  border-radius: 11px;
  background: #e6e7ee;
  box-shadow: 5px 5px 5px #c4c4ca, -5px -5px 5px #ffffff;
  img {
    display: block;
    width: 100%;
    padding: 3px;
    font-size: 1rem;
  }
  &:hover {
    border-radius: 50px;
    background: #e6e7ee;
    box-shadow: 50px 50px 100px #c4c4ca, -50px -50px 100px #ffffff;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  @media (max-width: 768px) {
    display: none;
  }

  a {
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

      &:before {
        background-color: rgb(22, 22, 22);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
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

const Login = styled.a`
  padding: 8px 16px;
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

const Wallet = styled.a`
  background-color: #424244;
  padding: 8px 16px;
  /* text-transform: uppercase; */
  letter-spacing: 0.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  color: #f9f9f9;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.31);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
