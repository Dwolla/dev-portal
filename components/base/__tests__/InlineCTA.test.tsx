import renderer from "react-test-renderer";
import InlineCTA from "../InlineCTA";
import guideIcon from "../assets/images/content-images/content-icons/guides-icon.svg";

test("Inline CTA", () => {
  const tree = renderer
    .create(
      <InlineCTA
        icon={guideIcon}
        text="To learn more about how to initiate a Same-Day ACH credit transfer, reference our developer resource article."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
