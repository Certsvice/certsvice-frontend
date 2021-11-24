import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Registry from "./components/Registry";
import Add from "./components/AddUniversity";

//import Blockchain from "./components/Blockchain";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/registry">
          <Registry />
        </Route>
        <Route exact path="/addUniversity">
          <Add />
        </Route>
      </Switch>
    </Router>
  );
}
