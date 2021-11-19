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
      {
        text: "API Reference",
        href: "https://developers.dwolla.com/api-reference/",
      },
      { text: "Support Forum", href: "https://discuss.dwolla.com/" },
      { text: "SDKs and Tools", href: "#sdks-and-tools" },
      { text: "Github Repos", href: "https://github.com/Dwolla/" },
    ],
  };

  const FOOTER_LEGAL_COPY = {
    title: "Financial institutions play an important role in our network.",
    operatorDescription:
      "Dwolla, Inc. is the operator of a software platform that communicates user instructions for funds transfers to our financial institution partners.",
    veridianDescription:
      "Dwolla is an agent of Veridian Credit Union. All ACH and Wire transfers are performed by Veridian Credit Union. Your Dwolla Balance, if any, is held in one or more pooled holding accounts held by Veridian Credit Union. These funds may not be eligible for share insurance by the National Credit Union Share Insurance Fund.",
    metaBankDescription: (
      <span>
        Sponsorship and Settlement of Push-to-Debit payment services provided by{" "}
        <span style={{ whiteSpace: "nowrap" }}>MetaBank®, N.A.</span>
        <br /> Push-to-Debit payments are typically available within 30 minutes.
      </span>
    ),
    rtpDescription:
      "Real-Time Payments are performed by Cross River Bank, which holds funds on behalf of the Receiver of such transactions in one or more pooled custodial accounts. These funds are not subject to FDIC pass-through deposit insurance.",
  };

  const tree = renderer
    .create(<Footer links={FOOTER_LINKS} legal={FOOTER_LEGAL_COPY} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
