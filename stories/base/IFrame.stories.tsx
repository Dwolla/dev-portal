import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import IFrame from "../../app/components/base/IFrame";

const ParentDiv = styled.div`
  padding: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

storiesOf("base/IFrame", module).add("Default", () => (
  <ParentDiv>
    <IFrame src="https://go.dwolla.com/l/391342/2018-10-30/n92nqn" />
  </ParentDiv>
));
