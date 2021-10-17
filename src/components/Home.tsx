import styled from "styled-components";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { AbiItem } from "web3-utils";
import { cerisviceAddress, abi } from "./config";

const Home = (props: any) => {
  const [data, setData] = useState(String);
  const [hash, setHash] = useState(String);

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
    const certsvice = new web3.eth.Contract(abi as AbiItem[], cerisviceAddress);

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
        <Upload>
          <input
            type="file"
            onChange={(e) => getInput(e.target.files)}
            onClick={(e) => (e.currentTarget.value = "")}
          ></input>
        </Upload>
        <button onClick={(e) => verify()}>Check</button>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;
const Upload = styled.div`
  margin-bottom: 2vw;
  max-width: 200px;
  height: 200px;
  flex-wrap: warp;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 0;
  align-items: center;
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  transition-timing-function: ease-out;
  transition: opacity 0.2s;
  width: 100%;
  border-radius: 50px;
  background: url("./images/home-icon.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40px 40px;
  box-shadow: 17px 17px 33px #a8a8a8, -17px -17px 33px #ffffff;
  input {
    opacity: 0;
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export default Home;
