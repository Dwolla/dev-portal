import renderer from "react-test-renderer";
import Table from "../../material-ui/Table";
import { INITIATE_TRANSFER_TABLE } from "../../../../../stories/base/material-ui/Table.stories";

test("Table", () => {
  const tree = renderer
    .create(<Table table={INITIATE_TRANSFER_TABLE} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
