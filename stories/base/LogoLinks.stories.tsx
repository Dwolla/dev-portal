import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import LogoLinks from "../../components/base/LogoLinks";
import phpColor from "../../assets/images/content-icons/php-logo.svg";
import phpGray from "../../assets/images/content-icons/php-logo-gray.svg";
import pythonColor from "../../assets/images/content-icons/python-logo.svg";
import pythonGray from "../../assets/images/content-icons/python-logo-gray.svg";
import rubyColor from "../../assets/images/content-icons/ruby-logo.svg";
import rubyGray from "../../assets/images/content-icons/ruby-logo-gray.svg";
import cSharpColor from "../../assets/images/content-icons/c-sharp-logo.svg";
import cSharpGray from "../../assets/images/content-icons/c-sharp-logo-gray.svg";
import kotlinColor from "../../assets/images/content-icons/kotlin-logo.svg";
import kotlinGray from "../../assets/images/content-icons/kotlin-logo-gray.svg";
import nodeColor from "../../assets/images/content-icons/node-js-logo.svg";
import nodeGray from "../../assets/images/content-icons/node-js-logo-gray.svg";

const Container = styled.div`
  padding: 50px;
`;

const content = [
  {
    label: "node",
    icon: nodeGray,
    iconActive: nodeColor,
    href: "www.google.com",
  },
  {
    label: "ruby",
    icon: rubyGray,
    iconActive: rubyColor,
    href: "#",
  },
  {
    label: "python",
    icon: pythonGray,
    iconActive: pythonColor,
    href: "#",
  },
  {
    label: "php",
    icon: phpGray,
    iconActive: phpColor,
    href: "#",
  },
  {
    label: "c-sharp",
    icon: cSharpGray,
    iconActive: cSharpColor,
    href: "#",
  },
  {
    label: "kotlin",
    icon: kotlinGray,
    iconActive: kotlinColor,
    href: "#",
  },
];

storiesOf("base|LogoLink", module).add("Default", () => (
  <Container>
    <LogoLinks tabs={content} />
  </Container>
));
