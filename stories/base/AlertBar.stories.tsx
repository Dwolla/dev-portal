import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import AlertBar from "../../app/components/base/AlertBar";

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

storiesOf("base|AlertBar", module)
  .add("Warning", () => (
    <ParentDiv>
      <AlertBar variation="warning">
        This is a warning! You need to gather new information if the Customer is
        placed into the retry status; simply passing the same information will
        result in the same insufficient scores.
      </AlertBar>
    </ParentDiv>
  ))
  .add("Info", () => (
    <ParentDiv>
      <AlertBar variation="info">
        Here is an info. The file must be either a .jpg, .jpeg, .png, or .pdf.
        Files must be no larger than 10MB in size.
      </AlertBar>
    </ParentDiv>
  ));
