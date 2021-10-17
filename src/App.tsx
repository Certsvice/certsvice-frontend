import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Block from "./components/Blockchain";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
function getLibrary(provider:any){
  return new Web3(provider)
}
//import Blockchain from "./components/Blockchain";

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Block">
          <Block />
        </Route>
      </Switch>
    </Router>
    </Web3ReactProvider>
  );
}
