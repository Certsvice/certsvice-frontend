import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header.component";
import Home from "./components/Home/home.page";
import Signup from "./components/SignUp/signup.page";
import Verify from "./components/University/university.page";
import Alert from "./components/Alert/alert.component";
import NotFound from "./components/NotFound/notfound.page";
import { useRecoilValue } from "recoil";
import { alertState } from "./store";
import Waiting from "./components/Waiting/waiting.page";
//import Blockchain from "./components/Blockchain";

export default function App() {
  const alertObj = useRecoilValue(alertState);
  return (
    <Router>
      {alertObj.active ? <Alert></Alert> : <></>}
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/waiting">
          <Waiting />
        </Route>
        {/* <Route exact path="/addUniversity">
          <Add />
        </Route> */}

        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
