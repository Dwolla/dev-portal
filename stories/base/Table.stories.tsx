import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered/react";
import Table from "../../components/base/Table";
import { InlineCode } from "../../components/base/Typography";

const tableData = (
  <table>
    <tr>
      <th>Parameter</th>
      <th>Required?</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
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
  </table>
);
storiesOf("base|Table", module)
  .addDecorator(centered)
  .add("default", () => <Table>{tableData}</Table>);
