import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Tooltip from "../../app/components/base/Tooltip";

const StyledDiv = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

storiesOf("base|Tooltip", module).add("default", () => (
  <StyledDiv>
    <Tooltip text="This is a Tooltip" hasArrow position="top">
      Tooltip to the top.
    </Tooltip>
    <br />
    <Tooltip text="This is a Tooltip" hasArrow position="right">
      Tooltip to the right.
    </Tooltip>
    <br />
    <Tooltip text="This is a Tooltip" hasArrow position="left">
      Tooltip to the left.
    </Tooltip>
    <br />
    <Tooltip text="This is a Tooltip" hasArrow position="bottom">
      Tooltip to the bottom.
    </Tooltip>
    <br />
    <Tooltip text="This is a Tooltip" hasArrow position="bottom" distance={40}>
      Custom distance from element.
    </Tooltip>
  </StyledDiv>
));
