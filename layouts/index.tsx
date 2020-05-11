import { AnchorsSetter } from "../components/util/Anchors";
import { MDXTypographyWrapper } from "../components/base/Typography";
import groupCodeExamples from "../components/util/groupCodeExamples";
import CodeExamples from "../components/partial/code/CodeExamples";

export const DefaultMDXWrapper = ({ children }: { children: any }) => (
  <MDXTypographyWrapper>
    <AnchorsSetter>
      {groupCodeExamples({
        children,
        into: CodeExamples,
      })}
    </AnchorsSetter>
  </MDXTypographyWrapper>
);

export default () => {
  return ({ children: content }: { children: any }) => {
    return <DefaultMDXWrapper>{content}</DefaultMDXWrapper>;
  };
};
