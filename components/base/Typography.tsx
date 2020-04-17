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

const StyledLink = styled.a`
  color: ${ORANGE_PRIMARY};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// List styles
const ListStyles = css`
  ${ParagraphStyles}
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;
`;

// Prop types
type Props = {
  children: any;
  isDark?: boolean;
};

// Link Prop types
type LinkProps = {
  text: string;
  href: string;
};

export const PreHeader = ({ children, isDark }: Props) => (
  <StyledPreHeader className={classnames({ dark: isDark })}>
    {children}
  </StyledPreHeader>
);

export const H1 = ({ children, isDark }: Props) => (
  <StyledH1 className={classnames({ dark: isDark })}>{children}</StyledH1>
);

export const H2 = ({ children, isDark }: Props) => (
  <StyledH2 className={classnames({ dark: isDark })}>{children}</StyledH2>
);

export const H3 = ({ children, isDark }: Props) => (
  <StyledH3 className={classnames({ dark: isDark })}>{children}</StyledH3>
);

export const H4 = ({ children, isDark }: Props) => (
  <StyledH4 className={classnames({ dark: isDark })}>{children}</StyledH4>
);

export const H5 = ({ children, isDark }: Props) => (
  <StyledH5 className={classnames({ dark: isDark })}>{children}</StyledH5>
);

export const SubHeader = ({ children, isDark }: Props) => (
  <StyledSubHeader className={classnames({ dark: isDark })}>
    {children}
  </StyledSubHeader>
);

export const Paragraph = ({ children, isDark }: Props) => (
  <StyledParagraph className={classnames({ dark: isDark })}>
    {children}
  </StyledParagraph>
);

export const UnorderedList = ({ children, isDark }: Props) => (
  <ul
    css={css`
      ${ListStyles}
    `}
    className={classnames({ dark: isDark })}
  >
    {children.map((item) => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
);

export const OrderedList = ({ children, isDark }: Props) => (
  <ol
    css={css`
      ${ListStyles}
    `}
    className={classnames({ dark: isDark })}
  >
    {children.map((item) => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ol>
);

export const BlockQuote = ({ children, isDark }: Props) => (
  <blockquote
    css={css`
      ${ParagraphStyles}
    `}
    className={classnames({ dark: isDark })}
  >
    {children}
  </blockquote>
);

export const InlineCode = ({ children, isDark }: Props) => (
  <StyledInlineCode className={classnames({ dark: isDark })}>
    {children}
  </StyledInlineCode>
);

export const Link = ({ text, href }: LinkProps) => (
  <StyledLink href={href}>{text}</StyledLink>
);
