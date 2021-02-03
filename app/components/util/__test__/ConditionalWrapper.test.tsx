import renderer from "react-test-renderer";
import ConditionalWrapper from "../ConditionalWrapper";

test("ContionalWrapper", () => {
  const tree = renderer
    .create(
      <ConditionalWrapper
        condition="true"
        wrapper={(children) => <div>{children}</div>}
      >
        <div></div>
      </ConditionalWrapper>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
