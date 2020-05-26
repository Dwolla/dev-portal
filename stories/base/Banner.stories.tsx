import * as React from "react";
import { storiesOf } from "@storybook/react";
import Banner from "../../components/base/Banner";
import FilterTabs from "../../components/base/FilterTabs";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";

// Filters to display as tabs
const TABS = [
  { value: "all", label: "ALL" },
  { value: "get-building", label: "GET BUILDING" },
  { value: "prerequisites", label: "PREREQUISITES" },
  { value: "features", label: "FEATURES" },
];

storiesOf("base|Banner", module)
  .add("default", () => (
    <Banner
      icon={guideIcon}
      topic="Guides"
      description="Step-by-step instructions to get you set up in the Dwolla API"
    />
  ))
  .add("No Icon", () => (
    <Banner
      topic="Comprehensive API documentation for developers and businesses."
      description="Step-by-step instructions to get you set up in the Dwolla API"
    />
  ))
  .add("With Button", () => (
    <Banner
      topic="Comprehensive API documentation for developers and businesses."
      description="Step-by-step instructions to get you set up in the Dwolla API"
      button={{ text: "Discover the Possibilities" }}
    />
  ))
  .add("With Filters", () => {
    const [filter, setFilter] = React.useState(TABS[0]);
    return (
      <Banner
        icon={guideIcon}
        topic="Guides"
        description="Step-by-step instructions to get you set up in the Dwolla API"
        filterTabs={
          <FilterTabs tabs={TABS} filter={filter} setFilter={setFilter} />
        }
      />
    );
  });
