import { AnchorsSetter } from "../components/util/Anchors";
import MDXStyleWrapper from "../components/partial/MDXStyleWrapper";
import groupCodeExamples from "../components/util/groupCodeExamples";
import CodeExamples from "../components/partial/code/CodeExamples";

export const DefaultMDXWrapper = ({ children }: { children: any }) => (
  <MDXStyleWrapper>
    <AnchorsSetter>
      {groupCodeExamples({
        children,
        into: CodeExamples,
      })}
    </AnchorsSetter>
  </MDXStyleWrapper>
);

export default () => {
  return ({ children: content }: { children: any }) => {
    return <DefaultMDXWrapper>{content}</DefaultMDXWrapper>;
  };
};
