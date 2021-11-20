import styled from "styled-components";
import { useState, ChangeEvent, useEffect } from "react";
import universitites from "./university.json";
import { useDispatch, useSelector } from "react-redux";
import { setAlertDetails, setAlertState } from "../features/user/alertSlice";
import { selectWalletAddress } from "../features/user/accountSlice";
interface universityInterface {
  UniversityName: string;
  UniversityCode: string;
}
interface Register {
  university: string;
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
const Registry = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector(selectWalletAddress);
  const [register, setRegister] = useState<Partial<Register>>({});
  const [student, setStudent] = useState<studentInterface[]>([]);
  const [uValidate, setUValidate] = useState("");
  const [aValidate, setAValidate] = useState("");

  const handleChange = (event: ChangeEvent<{ id?: string; value: string }>) => {
    if (event.target.id === "getAddress") {
    }
    const id = event.target.id as keyof typeof Registry;
    const { value } = event.target;
    checkValidate(id, value);
    setRegister({ ...register, [id]: value });
  };
  const checkValidate = (id: string, value: string) => {
    if (id === "address") {
      if (value.length === 0) {
        setAValidate("Enter your wallet address");
      } else {
        value.match("(0x)[^W_]{40}") && value.length === 42
          ? setAValidate("")
          : setAValidate("Invalid wallet address format");
      }
    } else {
      value.length > 0
        ? setUValidate("")
        : setUValidate("Enter your university name");
    }
  };

  const signUp = () => {
    const data = {
      address: register.address?.toLocaleLowerCase() ?? "",
      universityName: register.university ?? "",
    };
    const apiUrl = "http://localhost:8080/signup";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", "Bearer " + res.token);
          dispatch(
            setAlertDetails({
              type: "Success",
              message:
                "Thank you for signing up. We will sign up to contract as soon as possible.",
              active: true,
            })
          );
        } else {
          console.log("error");
        }
      });
  };
  const getStudent = () => {
    const apiUrl = "http://localhost:8080/api/student";
    const requestOptions = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token") || "",
      },
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())

      .then((res) => {
        console.log("table", res);
        if (res.data) {
          setStudent(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    // getStudent();
    console.log(student);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Content>
        {!walletAddress ? (
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
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
                  <input
                    id="university"
                    type="text"
                    list="universityName"
                    placeholder="University Name"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  ></input>
                  <datalist id="universityName">
                    {universitites.map((u: universityInterface) => {
                      return (
                        <option value={u.UniversityName} key={u.UniversityCode}>
                          {u.UniversityName}
                        </option>
                      );
                    })}
                  </datalist>
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
                  <a>Please click "CONNECT WALLET"</a>
                </span>
              </IfHaveAccount>
            </FormInput>
          </SignUpBox>
        ) : (
          <>
            <AddCertificate>
              <h4>Add University To SmartContract</h4>
              <FormInput
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <InputBox>
                  <label htmlFor="address">Address</label>
                  <InputGroup>
                    <span>
                      <img
                        src="https://img.icons8.com/ios-filled/25/44476a/ethereum.png"
                        alt="ETH address"
                      />
                    </span>
                    <input
                      disabled
                      id="address"
                      type="text"
                      placeholder="0xaeB....67C4"
                      // value={"" || "" + add?.address}
                      onChange={(e) => {}}
                    ></input>
                  </InputGroup>
                  <label className="alert">{}</label>
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
                    <input
                      id="university"
                      type="text"
                      disabled
                      placeholder="University Name"
                      // value={"" || "" + add?.universityName}
                    ></input>
                  </InputGroup>
                  <label className="alert">{}</label>
                </InputBox>
                <button
                  type="submit"
                  value="Submit"
                  onClick={() => {
                    // addToContract();
                  }}
                >
                  Add to SmartContract
                </button>
              </FormInput>
            </AddCertificate>
            <List>
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "50%" }}>Name</th>
                    <th style={{ width: "20%" }}>StudentID</th>
                    <th style={{ width: "30%" }}>issuer</th>
                  </tr>
                </thead>
                <tbody>
                  {student.map((s: studentInterface) => {
                    return (
                      <tr key={s._id}>
                        <td style={{ width: "40%" }}>{s.data.name}</td>
                        <td style={{ width: "20%" }}>{s.data.studentId}</td>
                        <td style={{ width: "30%" }}>{s.issuer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </List>
          </>
        )}
      </Content>
    </Container>
  );
};

const AddBtn = styled.button`
  border: 0px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  letter-spacing: 0.025em;
  font-size: 0.8rem;
  color: #18634b;
  background-color: #e6e7ee;

  border-radius: 10px;
  height: 2rem;
  width: 100%;
  &:hover {
    box-shadow: inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #fff;
  }
`;

const IfHaveAccount = styled.div`
  a {
    font-size: 1rem;
    font-weight: 600;
  }
  span {
    font-size: 1rem;
  }
`;
const Or = styled.div`
  margin: 20px 0px;
`;
const CheckBox = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  input {
    border-radius: 50%;
  }
  label {
    display: inline-block;
    position: relative;
    padding-left: 0.5rem;
    margin-bottom: 0;
    transition: all 0.2s ease;
    color: #44476a;
    font-size: 0.875rem;
    img {
      display: inline-block;
      position: absolute;
      width: 10px;
      height: 10px;
      left: 0;
      top: 0;
    }
  }
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  border-radius: 0.55rem;
  transition: all 0.2s ease;
  height: 2.5rem;
  span {
    margin: 0px !important;
    border-right: 0;
    height: 100%;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #ccc;
    border-width: 1px 0px 1px 1px;
    border-radius: 10px 0px 0px 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  input {
    ::placeholder {
      font-size: 1rem;
      color: #44476a;
      opacity: 0.8;
    }
    letter-spacing: 1px;
    padding: 0px 0px 0px 10px;
    border-left: 0;
    outline: none;
    flex: 1 1 auto;
    position: relative;
    font-size: 1rem;
    border: none;
    color: #44476a;
    border-radius: 0px 10px 10px 0px;
    background: #e6e7ee;
    box-shadow: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #fff;
    height: 100%;
    width: calc(100% - 2.5rem);
  }
`;
const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 2.5rem !important;
  position: relative;
  .alert {
    color: #a91e2c;
    padding-top: 3px;
    padding-left: 2.5rem;
    top: 100%;
    position: absolute;
    margin-bottom: 0px;
  }
`;
const FormInput = styled.form`
  display: block;
  margin-top: 0em;
  width: 100%;
  button {
    border: 0px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    letter-spacing: 0.025em;
    font-size: 1rem;
    color: inherit;
    background-color: #e6e7ee;
    box-shadow: 3px 3px 6px #b8b9be, -3px -3px 6px #fff;
    border-radius: 10px;
    height: 2.5rem;
    width: 100%;
    &:hover {
      box-shadow: inset 3px 3px 6px #b8b9be, inset -3px -3px 6px #fff;
    }
  }
`;
const AddCertificate = styled.div`
  padding: 4rem;
  max-width: 600px;
  height: auto;
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
  h4 {
    margin-bottom: 30px;
  }
  &:hover {
    box-shadow: inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff;
  }
`;
const SignUpBox = styled.div`
  padding: 4rem;
  max-width: 600px;
  height: auto;
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
  h4 {
    margin-bottom: 30px;
  }
  &:hover {
    box-shadow: inset 5px 5px 10px #c4c4ca, inset -5px -5px 10px #ffffff;
  }
`;
const List = styled.div`
  padding: 1rem;
  max-width: 700px;
  height: auto;
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
  table {
    border-collapse: collapse;
    width: 100%;
    thead {
      border-top: 20px;
      border-spacing: 30px;
      tr {
        border-bottom: 10px solid transparent;
        border-top: 10px solid transparent;
      }
    }
    tr {
      border-bottom: 10px solid transparent;
      border-spacing: 30px;
      td,
      th {
        text-align: left;
        vertical-align: top;
        border: 0;
        border-right: 20px solid transparent;
      }
    }
  }
`;
const Content = styled.div`
  width: 100%;
  padding-top: 50px;
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
export default Registry;
