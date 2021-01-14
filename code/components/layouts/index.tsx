import styled from "@emotion/styled";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { AnchorsSetter } from "../util/Anchors";
import MDXStyleWrapper from "../partial/MDXStyleWrapper";
import groupCodeExamples from "../util/groupCodeExamples";
import AlertBar from "../base/AlertBar";
import Button from "../base/Button";
import Card from "../base/Card";
import CardGrid from "../base/CardGrid";
import CodeExamples, { CodeExample } from "../partial/code/CodeExamples";
import Collapsible from "../base/Collapsible";
import Image from "../base/Image";
import ImageDownload from "../base/ImageDownload";
import { InlineCode } from "../base/Typography";
import OnThisPage from "../layout/OnThisPage";
import TabBarPanel from "../base/TabBarPanel";
import Table from "../base/Table";
import {
  AnchoredH1,
  AnchoredH2,
  AnchoredH3,
  AnchoredH4,
  AnchoredH5,
  AnchoredH6,
} from "../base/AnchoredHeading";

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
  Image,
  ImageDownload,
  InlineCode,
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
