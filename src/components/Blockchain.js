import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { cerisviceAddress, abi } from "./config";

function App() {
  const [account, setAccount] = useState(String);
  const [owner, setOwner] = useState("");
  const [student, setStudent] = useState("");
  // const [certsvice, setCetsvice] = useState(any)

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  async function loadOwner() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    const certsvice = new web3.eth.Contract(abi, cerisviceAddress);

    try {
      const data = await certsvice.methods
        .getOwner()
        .call({ from: accounts[0] });
      setOwner(data);
      console.log("data: ", data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function loadStudent() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    var accounts = await web3.eth.getAccounts();
    const certsvice = new web3.eth.Contract(abi, cerisviceAddress);
    

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className="container">
      <div>
        <button onClick={() => loadStudent()}>Get Student</button>
        <p>Student Data: {student}</p>
      </div>
      <div>
        <button onClick={() => loadOwner()}>Get Owner</button>
        <p>Owner is{owner}</p>
      </div>

      <p>Your account: {account}</p>
    </div>
  );
}

export default App;
