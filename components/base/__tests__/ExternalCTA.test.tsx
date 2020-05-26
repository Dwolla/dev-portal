import renderer from "react-test-renderer";
import ExternalCTA from "../ExternalCTA";
import developerCommunityIcon from "../assets/images/content-icons/developer-community-icon.svg";

test("External CTA", () => {
  const tree = renderer
    .create(
      <ExternalCTA
        icon={developerCommunityIcon}
        title="Developer Support"
        href="https://discuss.dwolla.com/"
        description="Interact with the developer community and Dwolla developer support to find answers to your technical questions."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test("No title", () => {
  const tree = renderer
    .create(
      <ExternalCTA
        icon={developerCommunityIcon}
        href="https://discuss.dwolla.com/"
        description="Interact with the developer community and Dwolla developer support to find answers to your technical questions."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
