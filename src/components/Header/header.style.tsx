import styled from "styled-components";
export const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;

  margin-right: 1rem;
  margin-left: auto;
  font-weight: bold;
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
      margin-left: 5px;
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

export const DropdownMenu = styled.div`
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

export const Dropdown = styled.div`
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
      font-weight: bold;
      font-size: 1rem;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
    }
  }
`;
export const Logo = styled.a`
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

export const Address = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  letter-spacing: 1.5px;
  cursor: pointer;
  color: #31344b;
  background: #e6e7ee;
  transition: all 0.2s ease 0s;
  border-radius: 7px;
  padding: 8px 8px;
  height: 100%;
  width: auto;
  box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
  &:hover {
    border-radius: 7px;
    background: #e6e7ee;
    box-shadow: inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #fff;
  }
  img {
    height: 20px;
    min-width: 20px;
    width: 20px;
    margin-right: 0px 0px 8px 0px;
    z-index: auto;
  }
  span {
    border-width: 0 !important;
    margin: 0px 10px;
    letter-spacing: 0px;
    font-weight: bold;
  }
`;
export const Login = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  letter-spacing: 1.5px;
  color: #31344b;
  transition: all 0.2s ease 0s;
  background: white;
  border-radius: 7px;
  span {
    margin: 0px 10px;
    letter-spacing: 0px;
    font-weight: bold;
  }
`;

export const Container = styled.div`
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

export const Nav = styled.nav`
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
