import React, { useState,useEffect } from "react"
import Web3 from 'web3'
import './App.css'
import { AbiItem } from 'web3-utils'
import {cerisviceAddress,abi} from './config'

function App(){
  const [account, setAccount] = useState(String)
  // const [certsvice, setCetsvice] = useState(any)

  async function loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    var accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const certsvice = new web3.eth.Contract(abi as AbiItem[],cerisviceAddress)

    try {
      const data = await certsvice.methods.getStudent().call({from: accounts[0]})
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  useEffect(() =>{
    loadBlockchainData()
  },[])


    return (
      <div className="container">
        <button onClick={() => loadBlockchainData()}>Fetch Greeting</button>
        <h1>Hello, {account}! </h1>
        <p>Your account: </p>
      </div>
    );
}

export default App;