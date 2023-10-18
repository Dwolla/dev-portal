import renderer from "react-test-renderer";
import { AcUnit } from "@mui/icons-material";
import ContentTooltip from "../ContentTooltip";

describe("ContentTooltip", () => {
  test("default", () => {
    const tree = renderer
      .create(
        <ContentTooltip
          content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
          testSuite
        >
          a digital wallet
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with icon, without title", () => {
    const tree = renderer
      .create(
        <ContentTooltip
          content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
          icon={AcUnit}
          testSuite
        >
          a digital wallet
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with icon, with title", () => {
    const tree = renderer
      .create(
        <ContentTooltip
          content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
          icon={AcUnit}
          testSuite
          title="The Dwolla Balance"
        >
          a digital wallet
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with icon, with title, with href", () => {
    const tree = renderer
      .create(
        <ContentTooltip
          content="The Dwolla balance is a Funding Source that can be utilized like a “wallet” for holding a stored value of USD funds."
          icon={AcUnit}
          title="The Dwolla Balance"
          href="https://developers.dwolla.com/docs"
        >
          a digital wallet
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with href, no icon", () => {
    const tree = renderer
      .create(
        <ContentTooltip
          content="When a custom icon isn't provided, the tooltip will use a default icon"
          href="https://developers.dwolla.com/docs"
        >
          a digital wallet
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("with `dwolla-balance` preset", () => {
    const tree = renderer
      .create(
        <ContentTooltip preset="dwolla-balance" testSuite>
          Dwolla Balance
        </ContentTooltip>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
