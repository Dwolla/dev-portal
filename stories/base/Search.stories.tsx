import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import { breakDown } from "../../app/components/breakpoints";
import Search from "../../app/components/base/Search";

const DivStyle = styled.div`
  width: 1500px;
  padding: 100px;
  @media (${breakDown("xs")}) {
    padding: unset;
  }
`;

storiesOf("base/Search", module).add("default", () => (
  <DivStyle>
    <Search />
  </DivStyle>
));
