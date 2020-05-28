import Link from "next/link";
import styled from "@emotion/styled";
import Card from "../components/base/Card";
import ExternalCTA from "../components/base/ExternalCTA";
import Banner from "../components/base/Banner";
import LogoLinks from "../components/base/LogoLinks";
import FooterCTA from "../components/base/FooterCTA";
import IFrame from "../components/base/IFrame";
import guideIcon from "../assets/images/content-images/content-icons/guides-icon.svg";
import conceptIcon from "../assets/images/content-images/content-icons/concepts-icon.svg";
import apiReferenceIcon from "../assets/images/content-images/content-icons/api-reference-icon.svg";
import developerCommunityIcon from "../assets/images/content-images/content-icons/developer-community-icon.svg";
// Impoting language logos in gray and in color
import phpColor from "../assets/images/content-images/content-icons/language-logos/php-logo.svg";
import phpGray from "../assets/images/content-images/content-icons/language-logos/php-logo-gray.svg";
import pythonColor from "../assets/images/content-images/content-icons/language-logos/python-logo.svg";
import pythonGray from "../assets/images/content-images/content-icons/language-logos/python-logo-gray.svg";
import rubyColor from "../assets/images/content-images/content-icons/language-logos/ruby-logo.svg";
import rubyGray from "../assets/images/content-images/content-icons/language-logos/ruby-logo-gray.svg";
import cSharpColor from "../assets/images/content-images/content-icons/language-logos/c-sharp-logo.svg";
import cSharpGray from "../assets/images/content-images/content-icons/language-logos/c-sharp-logo-gray.svg";
import kotlinColor from "../assets/images/content-images/content-icons/language-logos/kotlin-logo.svg";
import kotlinGray from "../assets/images/content-images/content-icons/language-logos/kotlin-logo-gray.svg";
import nodeColor from "../assets/images/content-images/content-icons/language-logos/node-js-logo.svg";
import nodeGray from "../assets/images/content-images/content-icons/language-logos/node-js-logo-gray.svg";
// Impoting partner logos in gray and in color
import aptoColor from "../assets/images/content-images/content-icons/partner-logos/apto-logo.svg";
import aptoGray from "../assets/images/content-images/content-icons/partner-logos/apto-logo-gray.svg";
import quickbooksColor from "../assets/images/content-images/content-icons/partner-logos/quickbooks-logo.svg";
import quickbooksGray from "../assets/images/content-images/content-icons/partner-logos/quickbooks-logo-gray.svg";
import plaidColor from "../assets/images/content-images/content-icons/partner-logos/plaid-logo.svg";
import plaidGray from "../assets/images/content-images/content-icons/partner-logos/plaid-logo-gray.svg";
import siftColor from "../assets/images/content-images/content-icons/partner-logos/sift-logo.svg";
import siftGray from "../assets/images/content-images/content-icons/partner-logos/sift-logo-gray.svg";
import slackColor from "../assets/images/content-images/content-icons/partner-logos/slack-logo.svg";
import slackGray from "../assets/images/content-images/content-icons/partner-logos/slack-logo-gray.svg";
import { H3 } from "../components/base/Typography";

const BannerWrapper = styled.div`
  height: 378px;
`;
const ContentContainer = styled.div`
  padding: 60px;
`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
  margin-top: -110px;
  padding-bottom: 60px;
`;
const StyledLink = styled.a`
  text-decoration: none;
`;

const CTAContainer = styled.div``;

const LogoLinksWrapper = styled.div`
  height: 120px;
  width: 100%;
`;

const languageContent = [
  {
    label: "Node",
    icon: nodeGray,
    iconActive: nodeColor,
    href: "https://github.com/Dwolla/dwolla-v2-node",
  },
  {
    label: "Ruby",
    icon: rubyGray,
    iconActive: rubyColor,
    href: "https://github.com/Dwolla/dwolla-v2-ruby",
  },
  {
    label: "Python",
    icon: pythonGray,
    iconActive: pythonColor,
    href: "https://github.com/Dwolla/dwolla-v2-python",
  },
  {
    label: "Php",
    icon: phpGray,
    iconActive: phpColor,
    href: "https://github.com/Dwolla/dwolla-swagger-php",
  },
  {
    label: "C-Sharp",
    icon: cSharpGray,
    iconActive: cSharpColor,
    href: "https://github.com/Dwolla/dwolla-v2-csharp",
  },
  {
    label: "Kotlin",
    icon: kotlinGray,
    iconActive: kotlinColor,
    href: "https://github.com/Dwolla/dwolla-v2-kotlin",
  },
];

const partnerContent = [
  {
    label: "Plaid",
    icon: plaidGray,
    iconActive: plaidColor,
    href: "https://www.dwolla.com/integrations/plaid/",
  },
  {
    label: "Sift",
    icon: siftGray,
    iconActive: siftColor,
    href: "https://www.dwolla.com/integrations/sift/",
  },
  {
    label: "Slack",
    icon: slackGray,
    iconActive: slackColor,
    href: "https://www.dwolla.com/partnerships/slack/",
  },
  {
    label: "Quickbooks",
    icon: quickbooksGray,
    iconActive: quickbooksColor,
    href: "https://www.dwolla.com/partnerships/quickbooks/",
  },
  {
    label: "Apto",
    icon: aptoGray,
    iconActive: aptoColor,
    href: "https://www.dwolla.com/contact/apto-waitlist/",
  },
];

export default function HomePage() {
  return (
    <>
      <BannerWrapper>
        <Banner
          topic="Integrate with Dwolla and move money smarter."
          description="From ideation, to implementation, and beyond, the Dwolla API is your connection to the US banking system."
          button={{
            text: "Discover the Possibilites",
            link: {
              href: "https://accounts-sandbox.dwolla.com/login",
              external: true,
            },
          }}
        />
      </BannerWrapper>
      <ContentContainer>
        <CardContainer>
          <Link href="/guides" key="Guides" passHref>
            <StyledLink>
              <Card
                icon={guideIcon}
                topic="Guides"
                description="Explore step-by-step walkthroughs to ensure your application is built to best practices."
              />
            </StyledLink>
          </Link>
          <Link href="/guides" key="Concepts" passHref>
            <StyledLink>
              <Card
                icon={conceptIcon}
                topic="Concepts"
                description="Transform your use case to business and functional requirements."
              />
            </StyledLink>
          </Link>
          <StyledLink
            href="https://docs.dwolla.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Card
              icon={apiReferenceIcon}
              link
              topic="API Reference"
              description="View details for all of Dwolla’s API endpoints with a complete reference"
            />
          </StyledLink>
        </CardContainer>
        <CTAContainer>
          <ExternalCTA
            icon={developerCommunityIcon}
            title="Developer Support"
            description="Interact with the developer community and Dwolla developer support to find answers to your technical questions."
            href="https://discuss.dwolla.com/"
          />
        </CTAContainer>
        <H3>SDKs &amp; Tools</H3>
        <LogoLinksWrapper>
          <LogoLinks tabs={languageContent} />
        </LogoLinksWrapper>
        <H3>Integrate With Other Platforms</H3>
        <LogoLinksWrapper>
          <LogoLinks tabs={partnerContent} />
        </LogoLinksWrapper>
        <H3>Get API Updates</H3>
        <IFrame src="https://go.dwolla.com/l/391342/2018-10-30/n92nqn" />
      </ContentContainer>
      <FooterCTA
        topic="Test in the Sandbox for free today."
        description="Use sandbox environment to test API requests."
        button={{
          text: "Get a Sandbox Account",
          link: {
            href: "https://accounts-sandbox.dwolla.com/sign-up",
            external: true,
          },
        }}
      />
    </>
  );
}
