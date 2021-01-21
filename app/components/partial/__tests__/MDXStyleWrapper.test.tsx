import renderer from "react-test-renderer";
import MDXStyleWrapper from "../MDXStyleWrapper";

test("MDXStyleWrapper", () => {
  const tree = renderer
    .create(
      <MDXStyleWrapper>
        <h1>This is wrapped in the MDX Style Wrapper</h1>
      </MDXStyleWrapper>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
