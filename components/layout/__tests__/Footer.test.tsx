import renderer from "react-test-renderer";
import Footer from "../Footer";

test("Footer", () => {
  const FOOTER_LINKS = {
    Dwolla: [
      { text: "About", href: "https://www.dwolla.com/about/" },
      { text: "Blog", href: "https://www.dwolla.com/updates/" },
      { text: "Pricing", href: "https://www.dwolla.com/pricing/" },
      { text: "Contact Sales", href: "https://www.dwolla.com/contact/" },
      { text: "Terms of Service", href: "https://www.dwolla.com/legal/tos/" },
      { text: "Privacy Policy", href: "https://www.dwolla.com/legal/privacy/" },
    ],
    Product: [
      { text: "Resources", href: "https://www.dwolla.com/resources/" },
      { text: "Features", href: "https://www.dwolla.com/features/" },
      { text: "Case Studies", href: "https://www.dwolla.com/case-studies/" },
      { text: "Integrations", href: "https://www.dwolla.com/integrations/" },
    ],
    Developers: [
      { text: "API Reference", href: "https://docs.dwolla.com/" },
      { text: "Support Forum", href: "https://discuss.dwolla.com/" },
      { text: "SDKs and Tools", href: "#sdks-and-tools" },
      { text: "Github Repos", href: "https://github.com/Dwolla/" },
    ],
  };

  const FOOTER_LEGAL_COPY = {
    title: "Financial institutions play an important role in our network.",
    description:
      "Dwolla, Inc. is an agent of Veridian Credit Union and all funds associated with your account in our network are held in one or more pooled accounts at Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund. Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to Veridian Credit Union.",
  };

  const tree = renderer
    .create(<Footer links={FOOTER_LINKS} legal={FOOTER_LEGAL_COPY} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
