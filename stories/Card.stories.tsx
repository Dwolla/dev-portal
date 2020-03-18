import * as React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../components/content/Card";
import guideIcon from "../public/images/guides-icon-large.svg";

// card when 'link' and 'badge' are not present
storiesOf("Card", module).add("Default", () => {
  return (
    <Card
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  );
});

// card when only 'link' is present
storiesOf("Card", module).add("Link", () => {
  return (
    <Card
      link
      icon={guideIcon}
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  );
});

// card when only 'badge' is present
storiesOf("Card", module).add("Badge", () => {
  return (
    <Card
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  );
});

// card when 'link' and 'badge' are present
storiesOf("Card", module).add("Link and Badge", () => {
  return (
    <Card
      link
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic"
      description="An existing unverified bank can be verified with microdeposits. Send two small debits and have your Customer verify the amounts."
    />
  );
});

// card when centered
storiesOf("Card", module).add("Center Align", () => {
  return (
    <Card
      centerAlign
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  );
});

// card when centered with link
storiesOf("Card", module).add("Center Align + Link", () => {
  return (
    <Card
      centerAlign
      link
      icon={guideIcon}
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  );
});

// card when centered with badge
storiesOf("Card", module).add("Center Align + Badge", () => {
  return (
    <Card
      centerAlign
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  );
});

// card when centered with link and badge
storiesOf("Card", module).add("Center Align + Link + Badge", () => {
  return (
    <Card
      centerAlign
      link
      icon={guideIcon}
      badge="BADGETEXT"
      topic="This is the Topic for center aligned cards reperesenting CTAs."
      description="This is a short description."
    />
  );
});
