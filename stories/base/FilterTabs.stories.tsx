import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import styled from "@emotion/styled";
import Tabs from "../../components/base/FilterTabs";

storiesOf("base|Filter tabs", module)
  .addDecorator(centered)
  .addParameters({ backgrounds: [{ name: "dark", value: "#2d2d47" }] })
  .add("default", () => {
    const [filter, setFilter] = React.useState(null);
    return (
      <BackgroundStyle>
        <Tabs
          tabs={["GET BUILDING", "PREREQUISITES", "FEATURES"]}
          filter={filter}
          setFilter={setFilter}
        />
      </BackgroundStyle>
    );
  });

const BackgroundStyle = styled.div`
  background: #2d2d47;
  width: 414px;
`;
