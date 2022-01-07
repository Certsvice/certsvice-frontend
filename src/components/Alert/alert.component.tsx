import {
  Hr,
  Header,
  Alert,
  BlurBG,
  AlertBox,
  Content,
  Container,
} from "./alert.style";
import { useState, useEffect } from "react";

import { useRecoilValue, useResetRecoilState } from "recoil";
import { alertState } from "../../store";
const AlertComponent = (props: any) => {
  const alertObj = useRecoilValue(alertState);
  const resetAlert = useResetRecoilState(alertState);
  const [seconds, setSeconds] = useState(5);
  const Tick = () => {
    if (seconds === 0) {
      resetAlert();
    } else {
      setSeconds(seconds - 1);
    }
  };

  useEffect(() => {
    // const timer = setInterval(() => {
    //   Tick();
    // }, 1000);
    // return () => clearInterval(timer);
  });
  return (
    <Container>
      <Content>
        <AlertBox>
          <Alert
            style={
              alertObj.type === "Success"
                ? { color: "#1a5a47" }
                : { color: "#a91e2c" }
            }
          >
            <Header>
              <span style={{ maxWidth: "2.5rem" }}>
                {alertObj.type === "Success" ? (
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/1a5a47/facebook-like--v1.png"
                    alt=""
                  />
                ) : (
                  <img
                    src="https://img.icons8.com/ios-glyphs/30/a91e2c/fire-element--v1.png"
                    alt=""
                  />
                )}
              </span>
              <span>{`${alertObj.header} ` + alertObj.type}!</span>
              <button
                onClick={() => {
                  resetAlert();
                }}
              >
                <span>×</span>
              </button>
            </Header>
            <Hr></Hr>
            {alertObj.type === "Success" ? (
              <p style={{ fontWeight: "bold" }}>{alertObj.msg}</p>
            ) : (
              <p style={{ fontWeight: "bold" }}>{alertObj.msg}</p>
            )}
            <p>{alertObj.message}</p>
            <label>i will close in {seconds} seconds.</label>
          </Alert>

          <BlurBG
            onClick={() => {
              resetAlert();
            }}
          ></BlurBG>
        </AlertBox>
      </Content>
    </Container>
  );
};

export default AlertComponent;
