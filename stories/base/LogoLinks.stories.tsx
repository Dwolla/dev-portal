import * as React from "react";
import styled from "@emotion/styled";
import { storiesOf } from "@storybook/react";
import LogoLinks from "../../app/components/base/LogoLinks";
// Importing language logos in gray and in color
import phpColor from "../../assets/images/content-images/content-icons/language-logos/php-logo.svg";
import phpGray from "../../assets/images/content-images/content-icons/language-logos/php-logo-gray.svg";
import pythonColor from "../../assets/images/content-images/content-icons/language-logos/python-logo.svg";
import pythonGray from "../../assets/images/content-images/content-icons/language-logos/python-logo-gray.svg";
import rubyColor from "../../assets/images/content-images/content-icons/language-logos/ruby-logo.svg";
import rubyGray from "../../assets/images/content-images/content-icons/language-logos/ruby-logo-gray.svg";
import cSharpColor from "../../assets/images/content-images/content-icons/language-logos/c-sharp-logo.svg";
import cSharpGray from "../../assets/images/content-images/content-icons/language-logos/c-sharp-logo-gray.svg";
import kotlinColor from "../../assets/images/content-images/content-icons/language-logos/kotlin-logo.svg";
import kotlinGray from "../../assets/images/content-images/content-icons/language-logos/kotlin-logo-gray.svg";
import nodeColor from "../../assets/images/content-images/content-icons/language-logos/node-js-logo.svg";
import nodeGray from "../../assets/images/content-images/content-icons/language-logos/node-js-logo-gray.svg";
// Impoting partner logos in gray and in color
import aptoColor from "../../assets/images/content-images/content-icons/partner-logos/apto-logo.svg";
import aptoGray from "../../assets/images/content-images/content-icons/partner-logos/apto-logo-gray.svg";
import quickbooksColor from "../../assets/images/content-images/content-icons/partner-logos/quickbooks-logo.svg";
import quickbooksGray from "../../assets/images/content-images/content-icons/partner-logos/quickbooks-logo-gray.svg";
import plaidColor from "../../assets/images/content-images/content-icons/partner-logos/plaid-logo.svg";
import plaidGray from "../../assets/images/content-images/content-icons/partner-logos/plaid-logo-gray.svg";
import siftColor from "../../assets/images/content-images/content-icons/partner-logos/sift-logo.svg";
import siftGray from "../../assets/images/content-images/content-icons/partner-logos/sift-logo-gray.svg";
import slackColor from "../../assets/images/content-images/content-icons/partner-logos/slack-logo.svg";
import slackGray from "../../assets/images/content-images/content-icons/partner-logos/slack-logo-gray.svg";

const Container = styled.div`
  height: 120px;
  margin: 50px;
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
    href: "https://www.dwolla.com/integrations/slack/",
  },
  {
    label: "Quickbooks",
    icon: quickbooksGray,
    iconActive: quickbooksColor,
    href: "https://www.dwolla.com/integrations/quickbooks/",
  },
  {
    label: "Apto",
    icon: aptoGray,
    iconActive: aptoColor,
    href: "https://www.dwolla.com/integrations/",
  },
];

storiesOf("base|LogoLinks", module)
  .add("languages", () => (
    <Container>
      <LogoLinks tabs={languageContent} />
    </Container>
  ))
  .add("partners", () => (
    <Container>
      <LogoLinks tabs={partnerContent} />
    </Container>
  ));
