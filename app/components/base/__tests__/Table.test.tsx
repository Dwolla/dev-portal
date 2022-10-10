import renderer from "react-test-renderer";
import Table from "../Table";
import { InlineCode } from "../Typography";

const tableData = (
  <>
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
  </>
);

test("Table", () => {
  const tree = renderer.create(<Table>{tableData}</Table>).toJSON();

  expect(tree).toMatchSnapshot();
});
