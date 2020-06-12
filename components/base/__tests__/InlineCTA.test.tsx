import renderer from "react-test-renderer";
import InlineCTA from "../InlineCTA";
import guideIcon from "../assets/images/content-images/content-icons/guides-icon.svg";

test("Inline CTA", () => {
  const tree = renderer
    .create(
      <InlineCTA
        icon={guideIcon}
        text="For more information on creating a Verified Personal Customer, reference our step by step guide."
        href="https://developers.dwolla.com/guides/personal-verified-customer"
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
