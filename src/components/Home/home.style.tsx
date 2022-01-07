import styled from "styled-components";
export const Separate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
  div {
    width: 33%;
    height: 1px;
    background-color: #44476a;
    opacity: 0.3;
  }
  p {
    padding: 0 2rem;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;

export const DragDrop = styled.div`
  h6 {
    margin: 1rem 0 0;
  }
`;

export const UploadBtn = styled.label`
  border: none;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 7px;
  background: #44476a;
  &:hover {
    background: white;
    color: #44476a;
  }
`;
export const Upload = styled.div`
  border: none;
  width: 66%;
  border-radius: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  img {
    min-width: 100px;
    font-size: 10px;
  }
`;

export const UploadBox = styled.label`
  max-width: 500px;
  height: 500px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;

  width: 100%;
  border-radius: 50px;
  background: #e6e7ee;
  box-shadow: 5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff;

  input {
    position: static;
    width: 100%;
    height: 100%;
    display: none;
  }

  /* &:hover {
    box-shadow: inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff;
  } */
`;

export const CertLogo = styled.img`
  height: 80px;
  animation: pulsing 3s infinite alternate;
  @keyframes pulsing {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;
export const CertBox = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
`;
export const Description = styled.div`
  max-width: 350px;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
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

  margin-bottom: 10vw;
`;
export const Container = styled.section`
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 90px;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: calc(100vh - 90px);
  width: 100vw;
  @media (min-width: 1280px) {
    ${Content} {
      max-width: 1280px;
      padding-top: 50px;
      flex-direction: row;
    }
    ${Description} {
      text-align: left;
      margin-right: 26px;
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
