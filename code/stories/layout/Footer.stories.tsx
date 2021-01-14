import React from "react";
import { storiesOf } from "@storybook/react";
import Footer from "../../components/layout/Footer";

storiesOf("layout|Footer", module).add("default", () => (
  <Footer
    links={{
      Discover: [
        { text: "Send", href: "#discover-send" },
        { text: "Receive", href: "#discover-receive" },
        { text: "Send & Receive", href: "#discover-send-receive" },
        { text: "Facilitate", href: "#facilitate" },
        { text: "Me to Me", href: "#me-to-me" },
      ],
      Concepts: [
        { text: "Basics", href: "#concepts-basics" },
        { text: "Essentials", href: "#concepts-essentials" },
        { text: "Integrations", href: "#concepts-integrations" },
      ],
      Guides: [
        { text: "Prerequisites", href: "#guides-prerequisites" },
        { text: "Get Building", href: "#guides-get-building" },
        { text: "Features", href: "#features" },
      ],
      "API Reference": [
        { text: "Documentation", href: "#api-reference-documentation" },
        { text: "SDK Support", href: "api-reference-sdk-support" },
        {
          text: "What does the Dwolla API do?",
          href: "#api-reference-what-it-do",
        },
      ],
      "Tools and SDKs": [
        { text: "Ruby", href: "#tools-and-sdks-ruby" },
        { text: "Python", href: "#tools-and-sdks-python" },
        { text: "PHP", href: "#tools-and-sdks-php" },
        { text: "C#", href: "#tools-and-sdks-csharp" },
        { text: "Java", href: "#tools-and-sdks-java" },
        { text: "JavaScript", href: "#tools-and-sdks-javascript" },
      ],
    }}
    legal={{
      title: "Financial institutions play an important role in our network.",
      veridianDescription:
        "Dwolla, Inc. is an agent of Veridian Credit Union and all funds associated with your account in our network are held in one or more pooled accounts at Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund. Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to Veridian Credit Union.",
      metaBankDescription: (
        <span>
          Sponsorship and Settlement of Push-to-Debit payment services provided
          by <span style={{ whiteSpace: "nowrap" }}>MetaBank®, N.A.</span>
          <br /> Push-to-Debit payments are typically available within 30
          minutes.
        </span>
      ),
    }}
  />
));
