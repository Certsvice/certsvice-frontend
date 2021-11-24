import styled from "styled-components";
import Web3 from "web3";
import { useState } from "react";
import { AbiItem } from "web3-utils";
import { certsviceAddress, abi } from "./config";

const Home = (props: any) => {
  const [data, setData] = useState(String);
  const [hash, setHash] = useState(String);
  const [dropMsg, setDropMsg] = useState("Drag and drop your certsvice file");

  const getInput = async (file: any) => {
    console.log(file[0]);
    const reader = new FileReader();
    if (file[0]) {
      reader.readAsText(file[0]);
    }
    reader.addEventListener(
      "load",
      () => {
        // this will then display a text file
        if (typeof reader.result === "string") {
          let obj = JSON.parse(reader.result);
          setData(obj.data);
          console.log("Data from file upload = ", obj.data);
        } else {
          setData("");
        }
      },
      false
    );
  };

  async function getTest() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    const certsvice = new web3.eth.Contract(abi as AbiItem[], certsviceAddress);

    try {
      const getData = await certsvice.methods
        .getTest("B6111427")
        .call({ from: accounts[0] });
      setHash(getData);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  const verify = () => {
    getTest();
    if (Web3.utils.soliditySha3(data) === hash) {
      console.log("hash of file = ", Web3.utils.soliditySha3(data));
      console.log("hash from contract = ", hash);
      console.log("  ");
    } else {
      console.log("Pls Upload file");
    }
  };

  return (
    <Container>
      <Content>
        <Description>
          <h1>An easy way to check and verify your certificates</h1>
          <p>
            Whether you're a student or an employer, OpenCerts lets you verify
            the certificates you have of anyone from any institution. All in one
            place.
          </p>
          <CertBox>
            <CertLogo
              src="https://img.icons8.com/ios-filled/100/44476a/certificate.png"
              alt="DemoCert"
            ></CertLogo>
          </CertBox>
        </Description>
        <UploadBox
          id="parent"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("child")!.style.pointerEvents = "none";
            document.getElementById("parent")!.style.boxShadow =
              "inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff";
            setDropMsg("Release to Upload");
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("child")!.style.pointerEvents = "auto";
            document.getElementById("parent")!.style.boxShadow =
              "5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff";
            setDropMsg("Drag and drop your certsvice file");
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("child")!.style.pointerEvents = "auto";
            document.getElementById("parent")!.style.boxShadow =
              "5px 5px 10px #c4c4ca, -5px -5px 10px #ffffff";
            getInput(e.dataTransfer.files);
            setDropMsg("Drag and drop your certsvice file");
          }}
        >
          <input
            id="getUpload"
            type="file"
            onChange={(e) => getInput(e.target.files)}
            onClick={(e) => (e.currentTarget.value = "")}
          ></input>
          <Upload id="child">
            <img
              src="https://img.icons8.com/ios/100/44476a/drag-and-drop.png"
              alt="dragdrop"
            />
            <DragDrop>
              <h6>{dropMsg}</h6>
            </DragDrop>
            <Separate>
              <div></div>
              <p>or</p>
              <div></div>
            </Separate>
            <UploadBtn htmlFor="getUpload">Choose File</UploadBtn>
          </Upload>
        </UploadBox>
      </Content>
    </Container>
  );
};

const Separate = styled.div`
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

const DragDrop = styled.div`
  h6 {
    margin: 1rem 0 0;
  }
`;

const UploadBtn = styled.label`
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
const Upload = styled.div`
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

const UploadBox = styled.label`
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

const CertLogo = styled.img`
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
const CertBox = styled.div`
  margin: 1.5rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;

`;
const Description = styled.div`
  max-width: 350px;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
`;
const Content = styled.div`
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
const Container = styled.section`
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

export default Home;
