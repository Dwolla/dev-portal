import renderer from "react-test-renderer";
import Pagination from "../Pagination";

test("Pagination next", () => {
  const tree = renderer
    .create(
      <Pagination variant="next" variantText="NEXT" href="#">
        Step 2: Add a funding source
      </Pagination>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("Pagination previous", () => {
  const tree = renderer
    .create(
      <Pagination variant="previous" variantText="PREVIOUS" href="#">
        Step 1: Creating Business Verified Customers
      </Pagination>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
