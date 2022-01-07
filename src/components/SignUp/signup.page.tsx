import {
  Container,
  Content,
  SignUpBox,
  FormInput,
  InputBox,
  Or,
  InputGroup,
  CheckBox,
  IfHaveAccount,
} from "./signup.style";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import axios from "axios";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { accountState, alertState } from "../../store";

interface universityInterface {
  _id: string;
  name: string;
  code: string;
}
interface Register {
  owner: string;
  address: string;
}
interface studentInterface {
  _id: string;
  data: {
    name: string;
    studentId: string;
  };
  issuer: string;
  trancript: [{}];
}
const Signup = () => {
  const walletObj = useRecoilValue(accountState);
  const latestSomeState = useRef(walletObj);
  const setAlertObj = useSetRecoilState(alertState);
  const [register, setRegister] = useState<Partial<Register>>({});
  const [student, setStudent] = useState<studentInterface[]>([]);
  const [university, setUniversity] = useState<universityInterface[]>([]);

  const [uValidate, setUValidate] = useState("");
  const [aValidate, setAValidate] = useState("");

  const handleChange = (event: ChangeEvent<{ id?: string; value: string }>) => {
    const id = event.target.id as keyof typeof Signup;
    const { value } = event.target;
    console.log(id, value);
    setRegister({ ...register, [id]: value });
    checkValidate(id, value);
  };
  const checkValidate = (id: string, value: string) => {
    if (id === "address") {
      if (value.length === 0) {
        setAValidate("Enter your wallet address");
      } else {
        value.match("[0-9]{3}-[0-9]{3}-[0-9]{4}") && value.length === 12
          ? setAValidate("")
          : setAValidate("Invalid wallet address format");
      }
    } else {
      value.length > 0
        ? setUValidate("")
        : setUValidate("Enter your university name");
    }
  };

  const showSuccess = (header: string, msg: string, message: string) => {
    setAlertObj({
      type: "Success",
      header: header,
      msg: msg,
      message: message,
      active: true,
    });
  };
  const showFail = (header: string, msg: string, message: string) => {
    setAlertObj({
      type: "Fail",
      header: header,
      msg: msg,
      message: message,
      active: true,
    });
  };
  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
  });
  const signUp = async () => {
    const data = {
      address: register.address?.toLocaleLowerCase() ?? "",
      owner: register.owner ?? "",
    };
    console.log(data);
    api
      .post("/signup", data)
      .then((res) => {
        console.log(res.data);
        showSuccess(
          "Sign-Up",
          `Your account waiting for verify`,
          "We will verify your account as soon as posible"
        );
        console.log(res.data);
      })
      .catch((err) => {
        showFail("Sign-Up", "Sorry", `${err.response.data.message}`);
        console.log(err.response, "err");
      });
  };

  const listUniversity = () => {
    api
      .get("/university")
      .then((res) => {
        setUniversity(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUniversity([{ _id: "0", name: "NoData", code: "null" }]);
      });
  };

  const checkStatus = () => {
    api.get(`/status/${localStorage.getItem("address")}`).then((res) => {
      console.log(res.data, "res");
      console.log(res);
      const status = res.data.status;

      if (status !== "notFound") {
        if (status === "true") {
          // window.location.href = "/register";
        } else {
          // window.location.href = "/null";
        }
      }
    });
  };
  useEffect(() => {
    // console.log(localStorage.getItem("address"));
    // if (localStorage.getItem("address")) {
    //   checkStatus();
    // }
    listUniversity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Content>
        <SignUpBox>
          <h4>SignUp University Account</h4>
          <FormInput
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputBox>
              <label htmlFor="address">Your Address</label>
              <InputGroup>
                <span>
                  <img
                    src="https://img.icons8.com/ios-filled/25/44476a/ethereum.png"
                    alt="ETH address"
                  />
                </span>
                <input
                  id="address"
                  type="text"
                  placeholder="0xaeB....67C4"
                  list="wallet"
                  value={register.address}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
                <datalist id="wallet">
                  <option value={walletObj.address} id={"1"} key={"1"}>
                    {walletObj.address}
                  </option>
                </datalist>
              </InputGroup>
              <label className="alert">{aValidate}</label>
            </InputBox>
            <InputBox>
              <label htmlFor="university">University Name</label>
              <InputGroup>
                <span>
                  <img
                    src="https://img.icons8.com/ios-filled/25/44476a/university.png"
                    alt="University Name"
                  />
                </span>
                {/* <input
                  id="owner"
                  type="text"
                  list="universityName"
                  placeholder="University Name"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></input>
                <datalist id="universityName">
                  {university.map((u: universityInterface) => {
                    return (
                      <option value={u._id} id={u._id} key={u._id}>
                        {u.name}
                      </option>
                    );
                  })}
                  
                </datalist> */}
                <select
                  id="owner"
                  name="owner"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  value={register.owner ?? "DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Choose a university ...
                  </option>
                  {university.map((u: universityInterface) => {
                    return (
                      <option value={u._id} key={u.code}>
                        {u.name}
                      </option>
                    );
                  })}
                </select>
              </InputGroup>
              <label className="alert">{uValidate}</label>
            </InputBox>
            <CheckBox>
              <input id="checkBox" type="checkbox" value={1}></input>
              <label htmlFor="checkBox">
                I agree to the terms and conditions
              </label>
            </CheckBox>
            <button
              type="submit"
              value="Submit"
              onClick={() => {
                signUp();
              }}
            >
              Sign Up
            </button>
            <Or>
              <span>or</span>
            </Or>
            <IfHaveAccount>
              <span>
                If already signup?<br></br>
                <span style={{ fontWeight: "bold" }}>
                  Please click "CONNECT WALLET"
                </span>
              </span>
            </IfHaveAccount>
          </FormInput>
        </SignUpBox>
      </Content>
    </Container>
  );
};

export default Signup;
