import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Registry from "./components/Registry";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
function getLibrary(provider: any) {
  return new Web3(provider);
}
//import Blockchain from "./components/Blockchain";

export default function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/registry">
            <Registry />
          </Route>
        </Switch>
      </Router>
    </Web3ReactProvider>
  );
}
