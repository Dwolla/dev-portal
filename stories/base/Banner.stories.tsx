import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Banner from "../../app/components/base/Banner";
import FilterTabs from "../../app/components/base/FilterTabs";
import CardGrid from "../../app/components/base/CardGrid";
import Card from "../../app/components/base/Card";
import guideIcon from "../../assets/images/content-images/content-icons/guides-icon.svg";

const CardGridWrapper = styled.div`
  margin-top: -50px;
  padding: 0 20px 20px;
`;

// Filters to display as tabs
const TABS = [
  { value: "all", label: "ALL" },
  { value: "get-building", label: "GET BUILDING" },
  { value: "prerequisites", label: "PREREQUISITES" },
  { value: "features", label: "FEATURES" },
];

storiesOf("base/Banner", module)
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
      button={{
        text: "Discover the Possibilities",
        link: {
          href: "https://accounts-sandbox.dwolla.com/login",
          external: true,
        },
      }}
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
  })
  .add("With Overlapping Cards", () => (
    <>
      <Banner
        topic="Comprehensive API documentation for developers and businesses."
        description="Step-by-step instructions to get you set up in the Dwolla API"
        button={{
          text: "Discover the Possibilities",
          link: {
            href: "https://accounts-sandbox.dwolla.com/login",
            external: true,
          },
        }}
        variant="overlapped"
      />
      <CardGridWrapper>
        <CardGrid variant="center">
          <Card
            icon={guideIcon}
            topic="Guides"
            description="Explore step-by-step walkthroughs to ensure your application is built to best practices."
            links={[{ href: "/guides", text: "View Guides" }]}
          />
          <Card
            icon={guideIcon}
            topic="Concepts"
            description="Transform your use case to business and functional requirements."
            links={[{ href: "/concepts", text: "View Concepts" }]}
          />
          <Card
            icon={guideIcon}
            topic="API Reference"
            description="View details for all of Dwolla’s API endpoints with a complete reference"
            links={[
              {
                href: "https://developers.dwolla.com/api-reference/",
                text: "View API Reference",
                external: true,
              },
            ]}
          />
        </CardGrid>
      </CardGridWrapper>
    </>
  ));
