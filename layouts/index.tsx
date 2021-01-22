import styled from "@emotion/styled";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { AnchorsSetter } from "../app/components/util/Anchors";
import MDXStyleWrapper from "../app/components/partial/MDXStyleWrapper";
import groupCodeExamples from "../app/components/util/groupCodeExamples";
import AlertBar from "../app/components/base/AlertBar";
import Button from "../app/components/base/Button";
import Card from "../app/components/base/Card";
import CardGrid from "../app/components/base/CardGrid";
import CodeExamples, {
  CodeExample,
} from "../app/components/partial/code/CodeExamples";
import Collapsible from "../app/components/base/Collapsible";
import ExternalCTA from "../app/components/base/ExternalCTA";
import Image from "../app/components/base/Image";
import ImageDownload from "../app/components/base/ImageDownload";
import { InlineCode } from "../app/components/base/Typography";
import InlineCTA from "../app/components/base/InlineCTA";
import OnThisPage from "../app/components/layout/OnThisPage";
import TabBarPanel from "../app/components/base/TabBarPanel";
import Table from "../app/components/base/Table";
import {
  AnchoredH1,
  AnchoredH2,
  AnchoredH3,
  AnchoredH4,
  AnchoredH5,
  AnchoredH6,
} from "../app/components/base/AnchoredHeading";

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

const MDX_COMPONENTS = {
  AlertBar,
  Button,
  Card,
  CardGrid,
  code: InlineCode,
  CodeExample,
  CodeExamples,
  Collapsible,
  ExternalCTA,
  Image,
  ImageDownload,
  InlineCode,
  InlineCTA,
  TabBarPanel,
  table: Table,
  h1: AnchoredH1,
  h2: AnchoredH2,
  h3: AnchoredH3,
  h4: AnchoredH4,
  h5: AnchoredH5,
  h6: AnchoredH6,
};

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
