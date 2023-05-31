import renderer from "react-test-renderer";
import PageFeedback from "../PageFeedback";

const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

describe("PageFeedback", () => {
  afterEach(() => jest.clearAllMocks());

  test("No variation", () => {
    const tree = renderer.create(<PageFeedback />);
    expect(tree).toMatchSnapshot();
  });

  test("With button onClick customization", () => {
    const tree = renderer.create(
      <PageFeedback
        approvalButton={{
          onClick: () => console.log("Modified approval onClick"),
        }}
        disapprovalButton={{
          onClick: () => console.log("Modified disapproval onClick"),
        }}
      />
    );
    const approvalButton = tree.root.findByProps({
      id: "button-feedback-approval",
    });
    const disapprovalButton = tree.root.findByProps({
      id: "button-feedback-disapproval",
    });

    approvalButton.props.onClick();
    expect(consoleLogSpy).toBeCalledWith("Modified approval onClick");

    disapprovalButton.props.onClick();
    expect(consoleLogSpy).toBeCalledWith("Modified disapproval onClick");
  });

  test("With button text customization", () => {
    const tree = renderer.create(
      <PageFeedback
        approvalButton={{ text: "Approve" }}
        disapprovalButton={{ text: "Disapprove" }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
