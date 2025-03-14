import renderer from "react-test-renderer";
import DemoPreviewCard from "../DemoPreviewCard";
import gif from "../../../assets/gifs/coast-demo-plaid.gif";

test("DemoPreviewCard with required props", () => {
  const tree = renderer
    .create(<DemoPreviewCard imageSrc={gif} href="https://example.com" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
