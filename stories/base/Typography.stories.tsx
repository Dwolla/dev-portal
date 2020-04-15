import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import {
  PreHeader,
  H1,
  H2,
  H3,
  H4,
  H5,
  SubHeader,
  Paragraph,
  UnorderedList,
  OrderedList,
  BlockQuote,
  InlineCode,
  Link,
} from "../../components/base/Typography";
import { PURPLE_DARK } from "../../components/colors";

// Div style for Dark background
const DivStyle = styled.div`
  padding: 100px;
  &.dark {
    background-color: ${PURPLE_DARK};
  }
`;

// Variables for placeholder text
const h1 = "H1 Heading";
const h2 = "H2 Heading";
const h3 = "H3 Heading";
const h4 = "H4 Heading";
const h5 = "H5 Heading";
const preHeader = "Preheader Text";
const subHeader = "Intro / Subhead Text Goes Here";
const blockquote = "Note: This is a blockquote.";
const inlineCode = "in-line code";
const link = "This is a link.";
const paragraph =
  " Paragraph text here. Lorem ipsum dolor sit amet. Integer nec augue purus. Morbi sollicitudin ectus id justo condimentum, sit amet euismod metus efficitur. Cras laoreet congue posuere. Nam at tempor nibh. Morbi pellentesque nunc nec sollicitudin luctus. ";
const unorderedlList = [
  { id: "1", text: "Unordered list or bullet text goes here" },
  { id: "2", text: "Unordered list or bullet text goes here" },
  { id: "3", text: "Unordered list or bullet text goes here" },
];
const orderedlList = [
  { id: "1", text: "Ordered list text goes here" },
  { id: "2", text: "Ordered list text goes here" },
  { id: "3", text: "Ordered list text goes here" },
];

// Stories
storiesOf("base|Typography", module)
  .addDecorator(centered)
  .addParameters({
    notes: "To view components in Dark mode, set background to Dark ",
  })
  // All variations of Typography in light background
  .add("Default", () => (
    <DivStyle>
      <PreHeader>{preHeader}</PreHeader>
      <H1>{h1}</H1>
      <H2>{h2}</H2>
      <H3>{h3}</H3>
      <H4>{h4}</H4>
      <H5>{h5}</H5>
      <SubHeader>{subHeader}</SubHeader>
      <Paragraph>
        {paragraph}
        <InlineCode>{inlineCode}</InlineCode>
        {paragraph}
        <Link>{link}</Link>
      </Paragraph>
      <UnorderedList>{unorderedlList}</UnorderedList>
      <OrderedList>{orderedlList}</OrderedList>
      <BlockQuote>{blockquote}</BlockQuote>
    </DivStyle>
  ))
  // All variations of Typography in Dark background
  .add("Default + Dark", () => (
    <DivStyle className="dark">
      <PreHeader isDark>{preHeader}</PreHeader>
      <H1 isDark>{h1}</H1>
      <H2 isDark>{h2}</H2>
      <H3 isDark>{h3}</H3>
      <H4 isDark>{h4}</H4>
      <H5 isDark>{h5}</H5>
      <SubHeader isDark>{subHeader}</SubHeader>
      <Paragraph isDark>
        {paragraph}
        <InlineCode isDark>{inlineCode}</InlineCode>
        {paragraph}
        <Link>{link}</Link>
      </Paragraph>
      <UnorderedList isDark>{unorderedlList}</UnorderedList>
      <OrderedList isDark>{orderedlList}</OrderedList>
      <BlockQuote isDark>{blockquote}</BlockQuote>
    </DivStyle>
  ));
