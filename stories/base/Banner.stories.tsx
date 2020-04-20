import * as React from "react";
import { storiesOf } from "@storybook/react";
import Banner from "../../components/base/Banner";
import FilterTabs from "../../components/base/FilterTabs";
import guideIcon from "../../public/images/guides-icon-large.svg";

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
    const [filter, setFilter] = React.useState(null);
    return (
      <Banner
        icon={guideIcon}
        topic="Guides"
        description="Step-by-step instructions to get you set up in the Dwolla API"
        filterTabs={
          <FilterTabs
            tabs={["GET BUILDING", "PREREQUISITES", "FEATURES"]}
            filter={filter}
            setFilter={setFilter}
          />
        }
      />
    );
  });
