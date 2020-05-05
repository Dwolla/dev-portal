import { AnchorsSetter } from "../components/util/Anchors";
import { MDXTypographyWrapper } from "../components/base/Typography";
import groupCodeExamples from "../components/util/groupCodeExamples";

export const DefaultMDXWrapper = ({ children }: { children: any }) => (
  <MDXTypographyWrapper>
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
  </MDXTypographyWrapper>
);

export default () => {
  return ({ children: content }: { children: any }) => {
    return <DefaultMDXWrapper>{content}</DefaultMDXWrapper>;
  };
};
