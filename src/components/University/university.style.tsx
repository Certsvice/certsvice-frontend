import styled from "styled-components";
export const AddBtn = styled.button`
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
export const IfHaveAccount = styled.div`
  a {
    font-size: 1rem;
    font-weight: 600;
  }
  span {
    font-size: 1rem;
  }
`;
export const Or = styled.div`
  margin: 20px 0px;
`;
export const CheckBox = styled.div`
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

export const InputGroup = styled.div`
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
export const InputBox = styled.div`
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
export const FormInput = styled.form`
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
export const SignUpBox = styled.div`
  padding: 4rem;
  max-width: 500px;
  height: auto;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-bottom: 2rem;
  margin-right: 0;
  width: 100%;
  border-radius: 50px;
  background: #e6e7ee;
  box-shadow: 6px 6px 12px #b8b9be, -6px -6px 12px #fff !important;
  h4 {
    margin-bottom: 30px;
  }
`;

export const List = styled.div`
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
export const Content = styled.div`
  width: 100%;
  padding-top: 50px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
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
    ${SignUpBox} {
      margin-right: 2rem;
      margin-bottom: 0;
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
