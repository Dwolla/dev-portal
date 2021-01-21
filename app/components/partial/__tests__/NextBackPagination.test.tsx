import renderer from "react-test-renderer";
import NextBackPagination from "../NextBackPagination";

test("Next/Back Pagination", () => {
  const tree = renderer
    .create(
      <NextBackPagination
        prevTitle="Previous Title"
        prevHref="#prev"
        nextTitle="Next Title"
        nextHref="#next"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
