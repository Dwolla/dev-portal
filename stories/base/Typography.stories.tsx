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
  Table,
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
const link = { text: "This is a link.", href: "#" };
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
const tableContents = (
  <>
    <thead>
      <tr>
        <th align="left">Bank to Dwolla Network Clearing</th>
        <th align="left">Dwolla Network to bank clearing</th>
        <th align="left">Time to Dwolla network</th>
        <th>Time to destination bank</th>
        <th align="left">
          Total time to <code>processed</code>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="left">Standard</td>
        <td align="left">Standard</td>
        <td align="left">3-4 business days</td>
        <td>1-2 business days</td>
        <td align="left">4-6 business days</td>
      </tr>
      <tr>
        <td align="left">Standard</td>
        <td align="left">Same-day</td>
        <td align="left">3-4 business days</td>
        <td>0-1 business days</td>
        <td align="left">3-5 business days</td>
      </tr>
      <tr>
        <td align="left">Next-day</td>
        <td align="left">Standard</td>
        <td align="left">1-2 business days</td>
        <td>1-2 business days</td>
        <td align="left">2-4 business days</td>
      </tr>
      <tr>
        <td align="left">Next-day</td>
        <td align="left">Same-day</td>
        <td align="left">1-2 business days</td>
        <td>0-1 business days</td>
        <td align="left">1-3 business days</td>
      </tr>
    </tbody>
  </>
);

// Stories
storiesOf("base|Typography", module)
  .addDecorator(centered)
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
        <Link text={link.text} href={link.href} />
      </Paragraph>
      <UnorderedList>{unorderedlList}</UnorderedList>
      <OrderedList>{orderedlList}</OrderedList>
      <BlockQuote>{blockquote}</BlockQuote>
      <Table>{tableContents}</Table>
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
        <Link text={link.text} href={link.href} />
      </Paragraph>
      <UnorderedList isDark>{unorderedlList}</UnorderedList>
      <OrderedList isDark>{orderedlList}</OrderedList>
      <BlockQuote isDark>{blockquote}</BlockQuote>
    </DivStyle>
  ));
