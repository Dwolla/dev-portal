import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import TabBarPanel from "../../components/base/TabBarPanel";
import phpColor from "../../assets/images/content-images/content-icons/php-logo.svg";
import phpGray from "../../assets/images/content-images/content-icons/php-logo-gray.svg";
import pythonColor from "../../assets/images/content-images/content-icons/python-logo.svg";
import pythonGray from "../../assets/images/content-images/content-icons/python-logo-gray.svg";
import rubyColor from "../../assets/images/content-images/content-icons/ruby-logo.svg";
import rubyGray from "../../assets/images/content-images/content-icons/ruby-logo-gray.svg";
import cSharpColor from "../../assets/images/content-images/content-icons/c-sharp-logo.svg";
import cSharpGray from "../../assets/images/content-images/content-icons/c-sharp-logo-gray.svg";
import kotlinColor from "../../assets/images/content-images/content-icons/kotlin-logo.svg";
import kotlinGray from "../../assets/images/content-images/content-icons/kotlin-logo-gray.svg";
import nodeColor from "../../assets/images/content-images/content-icons/node-js-logo.svg";
import nodeGray from "../../assets/images/content-images/content-icons/node-js-logo-gray.svg";

const Container = styled.div`
  padding: 50px;
`;

const content = [
  {
    label: "node",
    icon: nodeGray,
    iconActive: nodeColor,
    content: "Here's some content related to Node.",
  },
  {
    label: "ruby",
    icon: rubyGray,
    iconActive: rubyColor,
    content: "Here's some content related to Ruby.",
  },
  {
    label: "python",
    icon: pythonGray,
    iconActive: pythonColor,
    content: "Here's some content related to Python.",
  },
  {
    label: "php",
    icon: phpGray,
    iconActive: phpColor,
    content: "Here's some content related to PHP.",
  },
  {
    label: "c-sharp",
    icon: cSharpGray,
    iconActive: cSharpColor,
    content: "Here's some content related to C Sharp.",
  },
  {
    label: "kotlin",
    icon: kotlinGray,
    iconActive: kotlinColor,
    content: "Here's some content related to Kotlin.",
  },
];

storiesOf("base|TabBarPanel", module).add("Default", () => (
  <Container>
    <TabBarPanel tabs={content} />
  </Container>
));
