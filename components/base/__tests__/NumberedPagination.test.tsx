import renderer from "react-test-renderer";
import NumberedPagination from "../NumberedPagination";

test("Pagination next", () => {
  const tree = renderer
    .create(
      <NumberedPagination
        totalPages="9"
        newerLabel="Newer"
        olderLabel="Older"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
