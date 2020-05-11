import { AnchorsSetter } from "../components/util/Anchors";
import MDXStyleWrapper from "../components/partial/MDXStyleWrapper";
import groupCodeExamples from "../components/util/groupCodeExamples";

export const DefaultMDXWrapper = ({ children }: { children: any }) => (
  <MDXStyleWrapper>
    <AnchorsSetter>
      {groupCodeExamples({
        children,
        into: ({ children: c }: any) => (
          <>
            <h3>code examples</h3>
            {c}
          </>
        ),
      })}
    </AnchorsSetter>
  </MDXStyleWrapper>
);

export default () => {
  return ({ children: content }: { children: any }) => {
    return <DefaultMDXWrapper>{content}</DefaultMDXWrapper>;
  };
};
