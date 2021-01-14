import * as React from "react";
import { storiesOf } from "@storybook/react";
import styled from "@emotion/styled";
import NumberedPagination from "../../components/base/NumberedPagination";

const Container = styled.div`
  height: 120px;
  margin: 50px;
`;

storiesOf("base|NumberedPagination", module).add("default", () => (
  <Container>
    <NumberedPagination totalPages={9} newerLabel="Newer" olderLabel="Older" />
  </Container>
));
