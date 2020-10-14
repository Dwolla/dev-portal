import { createElement } from "react";
import styled from "@emotion/styled";
import { scrollTo } from "../util/Anchors";

const StyledAnchor = styled.a`
  text-decoration: none;
`;

interface AnchoredHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function AnchoredHeading({
  headingLevel,
  ...props
}: AnchoredHeadingProps) {
  return createElement(headingLevel, {
    ...props,
    children: (
      <>
        {props.children}
        {props.id && (
          <>
            {" "}
            <StyledAnchor
              href={`#${props.id}`}
              onClick={
                props.id
                  ? (e) => {
                      e.preventDefault();
                      scrollTo(props.id);
                    }
                  : null
              }
            >
              #
            </StyledAnchor>
          </>
        )}
      </>
    ),
  });
}

export const AnchoredH1 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h1", ...props });

export const AnchoredH2 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h2", ...props });

export const AnchoredH3 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h3", ...props });

export const AnchoredH4 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h4", ...props });

export const AnchoredH5 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h5", ...props });

export const AnchoredH6 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  AnchoredHeading({ headingLevel: "h6", ...props });
