import React from "react";
import styled from "@emotion/styled";
import { DefaultMDXWrapper } from "./index";
import Pages from "../app/modules/pages";
import Pagination from "../app/components/partial/NextBackPagination";
import FooterCTA from "../app/components/base/FooterCTA";
import { breakUp } from "../app/components/breakpoints";
import { Props } from "./types";

const StyledPagination = styled.div`
  padding: 20px;

  @media (${breakUp("md")}) {
    padding: 40px;
  }

  @media (${breakUp("lg")}) {
    width: 70%;
  }
`;

export default function GuidesLayout({ children, frontMatter }: Props) {
  const splitPath = frontMatter.__resourcePath.split("/"); // eslint-disable-line no-underscore-dangle
  splitPath.pop();
  const parentPath = splitPath.join("/");
  const prevPage = Pages.under(parentPath).find(
    (page) => page.guide.step === frontMatter.guide.step - 1
  );
  const nextPage = Pages.under(parentPath).find(
    (page) => page.guide.step === frontMatter.guide.step + 1
  );

  return (
    <>
      <DefaultMDXWrapper frontMatter={frontMatter}>
        {children}
      </DefaultMDXWrapper>

      {(!!prevPage || !!nextPage) && (
        <StyledPagination>
          <Pagination
            prevTitle={prevPage ? prevPage.title : ""}
            prevHref={prevPage ? prevPage.id : ""}
            nextTitle={nextPage ? nextPage.title : ""}
            nextHref={nextPage ? nextPage.id : ""}
          />
        </StyledPagination>
      )}

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
