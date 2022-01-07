import {
  Container,
  Content,
  ImgSide,
  Notfound,
  TextSide,
} from "./waiting.style";

const Waiting = () => {
  return (
    <Container>
      <Content>
        <Notfound>
          <TextSide>
            <h2>Your account waiting for verify</h2>
            <span>We will verify your account as soon as posible.</span>
          </TextSide>
          <ImgSide>
            <img
              src="https://demo.themesberg.com/neumorphism-ui/assets/img/illustrations/reading-side.svg"
              alt="404"
            ></img>
          </ImgSide>
        </Notfound>
      </Content>
    </Container>
  );
};

export default Waiting;
