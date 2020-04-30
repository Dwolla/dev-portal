import renderer from "react-test-renderer";
import FooterCTA from "../FooterCTA";

test("FooterCTA", () => {
  const tree = renderer
    .create(
      <FooterCTA
        topic="Test in the Sandbox for free today."
        description="Use sandbox environment to test API requests."
        button={{ text: "Get a Sandbox Account" }}
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
