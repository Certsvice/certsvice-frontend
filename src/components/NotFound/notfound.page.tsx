import {
  Container,
  Content,
  ImgSide,
  Notfound,
  TextSide,
} from "./notfound.style";

const NotFound = () => {
  return (
    <Container>
      <Content>
        <Notfound>
          <TextSide>
            <h2>404 NotFound</h2>
            <span>This is not the web page you are looking for.</span>
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

export default NotFound;
