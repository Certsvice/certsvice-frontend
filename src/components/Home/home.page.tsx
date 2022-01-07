import {
  Container,
  Content,
  Description,
  CertBox,
  CertLogo,
  UploadBox,
  Upload,
  UploadBtn,
  DragDrop,
  Separate,
} from "./home.style";
import Web3 from "web3";
import { useState } from "react";
import { AbiItem } from "web3-utils";
import { certsviceAddress, abi } from "../Web3/web3.config";

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

export default Home;
