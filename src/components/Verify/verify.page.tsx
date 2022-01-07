import {
  Container,
  Content,
  List,
  AddCertificate,
  FormInput,
  InputBox,
  InputGroup,
} from "./verify.style";
import { useState, ChangeEvent, useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, alertState } from "../../store";
import { getUniversity } from "../Web3/web3";
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
  const [walletObj, setWalletObj] = useRecoilState(accountState);
  const [alertObj, serAlertObj] = useRecoilState(alertState);
  const [register, setRegister] = useState<Partial<Register>>({});
  const [student, setStudent] = useState<studentInterface[]>([]);

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
          // serAlertObj({
          //   type: "Success",
          //   message:
          //     "Thank you for signing up. We will sign up to contract as soon as possible.",
          //   active: true,
          // });
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
      </Content>
    </Container>
  );
};

export default Registry;
