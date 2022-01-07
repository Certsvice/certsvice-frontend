import {
  AddBtn,
  IfHaveAccount,
  Or,
  CheckBox,
  InputBox,
  InputGroup,
  FormInput,
  SignUpBox,
  List,
  Container,
  Content,
} from "./university.style";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { accountState } from "../../store";

interface universityInterface {
  _id: string;
  address: string;
  universityName: string;
}
const University = () => {
  const [walletObj, setWalletObj] = useRecoilState(accountState);

  // const addToContract = async () => {
  //   if (add) {
  //     if (walletObj.address) {
  //       const uname = await certsvice.methods
  //         .addUniversity(add.address, add.universityName)
  //         .send({ from: walletObj.address })
  //         .then((result: any) => {
  //           console.log(result.status);
  //         });
  //       console.log(uname);
  //     }
  //   }
  // };

  const [add, setAdd] = useState<universityInterface>();
  const [university, setUniversity] = useState<universityInterface[]>([]);
  // const getUniversity = () => {
  //   const apiUrl = "http://localhost:8080/api/university";
  //   const requestOptions = {
  //     method: "GET",

  //     headers: { "Content-Type": "application/json" },
  //   };
  //   fetch(apiUrl, requestOptions)
  //     .then((response) => response.json())

  //     .then((res) => {
  //       console.log("table", res);
  //       if (res.data) {
  //         setUniversity(res.data);
  //       } else {
  //         console.log("else");
  //       }
  //     });
  // };
  useEffect(() => {
    // getUniversity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Content>
        <SignUpBox>
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
                  value={"" || add?.address}
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
                  value={"" || add?.universityName}
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
        </SignUpBox>
        <List>
          <table>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Address</th>
                <th style={{ width: "50%" }}>UniversityName</th>
              </tr>
            </thead>
            <tbody>
              {university.map((u: universityInterface) => {
                return (
                  <tr key={u._id}>
                    <td style={{ width: "30%" }}>
                      {`${u.address.slice(0, 8)}...${u.address.slice(-8)}`}
                    </td>
                    <td style={{ width: "50%" }}>{u.universityName}</td>
                    <td>
                      <AddBtn
                        onClick={() => {
                          setAdd(u);
                        }}
                      >
                        ADD+
                      </AddBtn>
                    </td>
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

export default University;
