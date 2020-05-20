import styled from "@emotion/styled";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { AnchorsSetter } from "../components/util/Anchors";
import MDXStyleWrapper from "../components/partial/MDXStyleWrapper";
import groupCodeExamples from "../components/util/groupCodeExamples";
import CodeExamples from "../components/partial/code/CodeExamples";
import OnThisPage from "../components/layout/OnThisPage";
import Table from "../components/base/Table";

const MDXContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  min-width: 70%;
  flex-grow: 1;
`;

type Props = {
  children: any;
  frontMatter: any;
};

const MDX_COMPONENTS = { table: Table };

export const DefaultMDXWrapper = ({ children, frontMatter }: Props) => (
  <MDXContainer>
    {frontMatter.meta && (
      <Head>
        {frontMatter.meta.title && <title>{frontMatter.meta.title}</title>}

        {frontMatter.meta.description && (
          <meta
            name="description"
            content={frontMatter.meta.description}
            key="description"
          />
        )}
      </Head>
    )}

    <MDXProvider components={MDX_COMPONENTS}>
      <ContentWrapper>
        <MDXStyleWrapper>
          <AnchorsSetter>
            {groupCodeExamples({
              children,
              into: CodeExamples,
            })}
          </AnchorsSetter>
        </MDXStyleWrapper>
      </ContentWrapper>
    </MDXProvider>

    <OnThisPage />
  </MDXContainer>
);

export default (frontMatter) => {
  return ({ children: content }: { children: any }) => {
    return (
      <DefaultMDXWrapper frontMatter={frontMatter}>{content}</DefaultMDXWrapper>
    );
  };
};
