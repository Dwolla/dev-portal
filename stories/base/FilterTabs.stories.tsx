import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import styled from "@emotion/styled";
import FilterTabs from "../../app/components/base/FilterTabs";
import { PURPLE_DARK } from "../../app/components/colors";

const DarkBackground = styled.div`
  background: ${PURPLE_DARK};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Filters to display as tabs
const TABS = [
  { value: "all", label: "ALL" },
  { value: "get-building", label: "GET BUILDING" },
  { value: "prerequisites", label: "PREREQUISITES" },
  { value: "features", label: "FEATURES" },
];

storiesOf("base/FilterTabs", module)
  .addDecorator(centered)
  .addParameters({ backgrounds: [{ name: "dark", value: PURPLE_DARK }] })
  .add("default", () => {
    const [filter, setFilter] = React.useState(TABS[0]);
    return (
      <DarkBackground>
        <FilterTabs tabs={TABS} filter={filter} setFilter={setFilter} />
      </DarkBackground>
    );
  })
  .add("sidebar", () => {
    const [filter, setFilter] = React.useState(TABS[0]);
    return (
      <FilterTabs
        tabs={TABS}
        filter={filter}
        setFilter={setFilter}
        variant="sidebar"
      />
    );
  });
