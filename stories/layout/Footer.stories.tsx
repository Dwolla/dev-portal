import React from "react";
import { storiesOf } from "@storybook/react";
import Footer from "../../app/components/layout/Footer";

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

      description: (
        <>
          All funds transfers made using the Dwolla Platform are performed by a
          financial institution partner, and any funds held in a Dwolla Balance
          are held by a financial institution partner.{" "}
          <a
            href="https://www.dwolla.com/legal/about-our-financial-institution-partners/#legal-content"
            target="_blank"
            rel="noreferrer"
          >
            Learn more about our financial institution partners
          </a>
          .
        </>
      ),
    }}
  />
));
