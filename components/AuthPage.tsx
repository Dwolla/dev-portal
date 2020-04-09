import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "./base/Button";
import { PURPLE_PRIMARY, GREY_4 } from "./colors";
import { POPPINS } from "./typography";

type Props = {
  setAuthenticated: Function;
};

const AuthPage = ({ setAuthenticated }: Props) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const authenticate = (e) => {
    e.preventDefault();

    if (password === "backtowork") {
      setAuthenticated(true);
    } else {
      setPassword("");
      setPasswordError(true);
    }
  };

  return (
    <AuthWrap>
      <form onSubmit={authenticate}>
        <InputStyled
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
          }}
        />
        <Button
          text="Login"
          size="standard"
          variant="secondary"
          type="submit"
        />
      </form>
      {passwordError && <ErrorStyled>Error: Invalid Password</ErrorStyled>}
    </AuthWrap>
  );
};

const AuthWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${PURPLE_PRIMARY};
`;

const InputStyled = styled.input`
  height: 38px;
  width: 180px;
  border: 1px solid ${GREY_4};
  border-radius: 5px;
  padding: 0 10px;
  margin-right: 3px;
  font-size: 14px;
  font-family: ${POPPINS};
`;

const ErrorStyled = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-family: ${POPPINS};
  color: #e9423b;
`;

export default AuthPage;
