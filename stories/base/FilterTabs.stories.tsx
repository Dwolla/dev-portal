import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import styled from "@emotion/styled";
import FilterTabs from "../../components/base/FilterTabs";
import { PURPLE_DARK } from "../../components/colors";

storiesOf("base|FilterTabs", module)
  .addDecorator(centered)
  .addParameters({ backgrounds: [{ name: "dark", value: PURPLE_DARK }] })
  .add("default", () => {
    const [filter, setFilter] = React.useState(null);
    return (
      <BackgroundStyle>
        <FilterTabs
          tabs={["GET BUILDING", "PREREQUISITES", "FEATURES"]}
          filter={filter}
          setFilter={setFilter}
        />
      </BackgroundStyle>
    );
  });

const BackgroundStyle = styled.div`
  background: ${PURPLE_DARK};
  width: 414px;
`;
