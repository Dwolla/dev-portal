import Head from "next/head";
import { AnchorsSetter } from "../components/util/Anchors";
import MDXStyleWrapper from "../components/partial/MDXStyleWrapper";
import groupCodeExamples from "../components/util/groupCodeExamples";
import CodeExamples from "../components/partial/code/CodeExamples";

type Props = {
  children: any;
  frontMatter: any;
};

export const DefaultMDXWrapper = ({ children, frontMatter }: Props) => (
  <>
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

    <MDXStyleWrapper>
      <AnchorsSetter>
        {groupCodeExamples({
          children,
          into: CodeExamples,
        })}
      </AnchorsSetter>
    </MDXStyleWrapper>
  </>
);

export default (frontMatter) => {
  return ({ children: content }: { children: any }) => {
    return (
      <DefaultMDXWrapper frontMatter={frontMatter}>{content}</DefaultMDXWrapper>
    );
  };
};
