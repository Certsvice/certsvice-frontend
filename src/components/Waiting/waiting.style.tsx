import styled from "styled-components";

export const ImgSide = styled.div`
  width: 400px;
  height: auto;
`;
export const TextSide = styled.div`
  flex-direction: column;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  display: flex;
  h2 {
    font-weight: bold;
  }
`;
export const Notfound = styled.div`
  border-radius: 0.55rem;
  display: flex;
  width: auto;
  height: auto;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff !important;
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
`;

export const Content = styled.div`
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
export const Container = styled.section`
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
