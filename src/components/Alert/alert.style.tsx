import styled from "styled-components";
export const Hr = styled.hr`
  border: 0;
  border-top: 2px solid;
  height: 0;
  padding-bottom: 0.5rem;
  width: 100%;
  margin: 0;
`;
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 100%;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;

  span {
    margin: 0px 1rem 0px 0px !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: auto;
      height: auto;
    }
  }
  button {
    opacity: 1;
    cursor: pointer;
    background-color: transparent;
    border: none;
    padding: 0;
    margin-left: auto;
    height: 100%;
    display: flex;
    span {
      font-size: 1.75rem;
      text-align: center;
      background-color: transparent;
      color: #141313;
      display: block;
      width: auto;
      height: 100%;
      &:hover {
        opacity: 0.8;
        color: #a91e2c;
      }
    }
  }
`;
export const Alert = styled.div`
  background: #e6e7ee;
  padding: 1rem 1.5rem;
  opacity: 1 !important;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  z-index: 1020;
  border-radius: 0.55rem;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  p {
    margin-bottom: 0;
    font-size: 1rem;
  }
  label {
    margin-top: 10px;
  }
  animation: pulsing 0.5s;
  @keyframes pulsing {
    0% {
      transform: scale(0.6);
    }
    60% {
      transform: scale(1.1);
    }
    85% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;
export const BlurBG = styled.div`
  position: fixed;
  z-index: 1010;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
  width: 100%;
`;
export const AlertBox = styled.div`
  max-width: 500px;
  width: 100%;

  display: flex;
  padding: 4rem;

  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: auto;
`;
export const Container = styled.section`
  overflow: hidden;
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  @media (min-width: 1280px) {
    ${Content} {
      max-width: 1280px;
    }
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    ${Content} {
      max-width: 1024px;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    ${Content} {
      max-width: 768px;
    }
  }
  @media (max-width: 640px) {
    ${Content} {
      max-width: 640px;
    }
  }
`;
