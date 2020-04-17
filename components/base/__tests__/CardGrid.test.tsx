import renderer from "react-test-renderer";
import CardGrid from "../CardGrid";
import Card from "../Card";
import guideIcon from "../../public/images/guides-icon-large.svg";

test("CardGrid", () => {
  const tree = renderer
    .create(
      <CardGrid>
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
        <Card
          icon={guideIcon}
          topic="This is the Topic"
          description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
        />
      </CardGrid>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
