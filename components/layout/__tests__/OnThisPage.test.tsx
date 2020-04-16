import renderer from "react-test-renderer";
import { createElement } from "react";
import OnThisPage from "../OnThisPage";
import { AnchorsProvider, AnchorsSetter } from "../../util/Anchors";

const Heading = (props: { children: string; originalType: "h1" | "h2" }) =>
  createElement(props.originalType, props);

test("with anchors", () => {
  const tree = renderer
    .create(
      <AnchorsProvider>
        <AnchorsSetter>
          <Heading originalType="h1">Hello 1</Heading>
          <Heading originalType="h1">Hello 2</Heading>
          <Heading originalType="h1">Hello 3</Heading>
          <Heading originalType="h1">Hello 4</Heading>
        </AnchorsSetter>
        <OnThisPage topOfPageOffset={0} />
      </AnchorsProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("without anchors", () => {
  const tree = renderer
    .create(
      <AnchorsProvider>
        <AnchorsSetter>
          <div>hello</div>
        </AnchorsSetter>
        <OnThisPage topOfPageOffset={0} />
      </AnchorsProvider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
