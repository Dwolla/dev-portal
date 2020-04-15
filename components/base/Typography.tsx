/** @jsx jsx */
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import classnames from "../../modules/classnames";
import { POPPINS, ROBOTO, MONACO } from "../typography";
import {
  HEADLINE_TEXT,
  PARAGRAPH_TEXT,
  WHITE_PRIMARY,
  ORANGE_PRIMARY,
  PURPLE_DARK,
  GREY_1,
  GREY_3,
  GREY_4,
  GREY_5,
} from "../colors";

// Heading styles
const headingStyles = css`
  color: ${HEADLINE_TEXT};
  font-family: ${POPPINS};
  font-weight: 300;
  &.dark {
    color: ${WHITE_PRIMARY};
  }
`;

const StyledPreHeader = styled.span`
  color: ${GREY_5};
  text-transform: uppercase;
  font-family: ${POPPINS};
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1.14px;
  line-height: 21px;
  &.dark {
    color: ${GREY_4};
  }
`;

const StyledH1 = styled.h1`
  ${headingStyles}
  font-size: 42px;
  line-height: 52px;
`;
const StyledH2 = styled.h2`
  ${headingStyles}
  font-size: 30px;
  line-height: 46px;
`;
const StyledH3 = styled.h3`
  ${headingStyles}
  font-size: 22px;
  line-height: 33px;
`;
const StyledH4 = styled.h4`
  ${headingStyles}
  font-size: 18px;
  line-height: 27px;
`;
const StyledH5 = styled.h5`
  ${headingStyles}
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
`;

// Paragraph syles
const ParagraphStyles = css`
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  &.dark {
    color: ${GREY_4};
  }
`;

const StyledSubHeader = styled.span`
  ${ParagraphStyles}
  font-size: 20px;
  font-weight: 300;
  line-height: 26px;
`;

const StyledParagraph = styled.p`
  ${ParagraphStyles}
  font-size: 16px;
  line-height: 28px;
`;

const StyledInlineCode = styled.code`
  color: ${PARAGRAPH_TEXT};
  font-family: ${MONACO};
  font-size: 13px;
  line-height: 20px;
  border: 1px solid ${GREY_3};
  border-radius: 5px;
  background-color: ${GREY_1};
  padding: 2px 5px;
  &.dark {
    background-color: ${PURPLE_DARK};
    color: ${GREY_4};
  }
`;

export const Link = styled.a`
  color: ${ORANGE_PRIMARY};
`;

// List styles
const ListStyles = css`
  ${ParagraphStyles}
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;
`;

// Prop types
type TypographyProps = {
  children: any;
  isDark?: boolean;
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  isDark?: boolean;
}

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  isDark?: boolean;
}

interface UListProps extends React.HTMLAttributes<HTMLUListElement> {
  isDark?: boolean;
}

interface OListProps extends React.HTMLAttributes<HTMLOListElement> {
  isDark?: boolean;
}

interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  isDark?: boolean;
}

export const PreHeader = ({ children, isDark }: TypographyProps) => (
  <StyledPreHeader className={classnames({ dark: isDark })}>
    {children}
  </StyledPreHeader>
);

export const H1 = ({ isDark, ...props }: HeadingProps) => (
  <StyledH1
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const H2 = ({ isDark, ...props }: HeadingProps) => (
  <StyledH2
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const H3 = ({ isDark, ...props }: HeadingProps) => (
  <StyledH3
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const H4 = ({ isDark, ...props }: HeadingProps) => (
  <StyledH4
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const H5 = ({ isDark, ...props }: HeadingProps) => (
  <StyledH5
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const SubHeader = ({ children, isDark }: TypographyProps) => (
  <StyledSubHeader className={classnames({ dark: isDark })}>
    {children}
  </StyledSubHeader>
);

export const Paragraph = ({ isDark, ...props }: ParagraphProps) => (
  <StyledParagraph
    {...props}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const UnorderedList = ({ isDark, ...props }: UListProps) => (
  <ul
    {...props}
    css={ListStyles}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const OrderedList = ({ isDark, ...props }: OListProps) => (
  <ol
    {...props}
    css={ListStyles}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const BlockQuote = ({ isDark, ...props }: QuoteProps) => (
  <blockquote
    {...props}
    css={ParagraphStyles}
    className={classnames(props.className, { dark: isDark })}
  />
);

export const InlineCode = ({ children, isDark }: TypographyProps) => (
  <StyledInlineCode className={classnames({ dark: isDark })}>
    {children}
  </StyledInlineCode>
);
