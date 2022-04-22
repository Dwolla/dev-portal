import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import Table from "../../app/components/base/Table";
import { InlineCode } from "../../app/components/base/Typography";

const ParentDiv = styled.div`
  padding: 50px;
`;

const tableData = (
  <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Required?</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>firstName</td>
        <td>yes</td>
        <td>string</td>
        <td>Customer&apos;s first name</td>
      </tr>
      <tr>
        <td>lastName</td>
        <td>yes</td>
        <td>string</td>
        <td>Customer&apos;s last name</td>
      </tr>
      <tr>
        <td>email</td>
        <td>yes</td>
        <td>string</td>
        <td>Customer&apos;s last name</td>
      </tr>
      <tr>
        <td>type</td>
        <td>yes</td>
        <td>string</td>
        <td>
          Value of <InlineCode>receive-only</InlineCode>
        </td>
      </tr>
      <tr>
        <td>businessName</td>
        <td>yes</td>
        <td>string</td>
        <td>Customer&apos;s registered business name</td>
      </tr>
      <tr>
        <td>ipAddress</td>
        <td>yes</td>
        <td>string</td>
        <td>Customer&apos;s IP address</td>
      </tr>
    </tbody>
  </table>
);
storiesOf("base/Table", module).add("default", () => (
  <ParentDiv>
    <Table>{tableData}</Table>
  </ParentDiv>
));
