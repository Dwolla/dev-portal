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
      {
        text: "Privacy Options",
        onClick: () =>
          window.Osano.cm.showDrawer("osano-cm-dom-info-dialog-open"),
      },
    ],
    Product: [
      { text: "Resources", href: "https://www.dwolla.com/resources/" },
      { text: "Features", href: "https://www.dwolla.com/features/" },
      { text: "Case Studies", href: "https://www.dwolla.com/case-studies/" },
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
  };

  const tree = renderer
    .create(<Footer links={FOOTER_LINKS} legal={FOOTER_LEGAL_COPY} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
