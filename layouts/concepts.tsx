import React from "react";
import styled from "@emotion/styled";
import { DefaultMDXWrapper } from "./index";
import Card from "../app/components/base/Card";
import FooterCTA from "../app/components/base/FooterCTA";
import { breakUp } from "../app/components/breakpoints";
import developerCommunityIcon from "../assets/images/content-images/content-icons/developer-community.svg";
import { Props } from "./types";

const CardWrap = styled.div`
  padding: 0 20px 20px;

  @media (${breakUp("md")}) {
    padding: 20px 40px 40px;
    width: 70%;
  }
`;

export default function ConceptsLayout({ children, frontMatter }: Props) {
  return (
    <>
      <DefaultMDXWrapper frontMatter={frontMatter}>
        {children}
      </DefaultMDXWrapper>

      <CardWrap>
        <Card
          icon={developerCommunityIcon}
          topic="Still haven’t found what you are looking for?"
          description="Ask the community."
          links={[
            {
              href: "https://discuss.dwolla.com/",
              text: "Community",
              external: true,
            },
          ]}
          horizontalCenterAlign
        />
      </CardWrap>

      <FooterCTA
        topic="Test in the Sandbox for free today."
        description="Use sandbox environment to test API requests."
        button={{
          text: "Get API Keys",
          link: {
            href: "https://accounts-sandbox.dwolla.com/sign-up",
            external: true,
          },
        }}
      />
    </>
  );
}
