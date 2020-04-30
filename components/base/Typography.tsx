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
import { minWidth, BREAKPOINT_IPAD } from "../breakpoints";

// Heading styles
const headingStyles = {
  global: css`
    color: ${HEADLINE_TEXT};
    font-family: ${POPPINS};
    font-weight: 300;
    &.dark {
      color: ${WHITE_PRIMARY};
    }
  `,
  h1: css`
    font-size: 42px;
    line-height: 52px;
  `,
  h2: css`
    font-size: 30px;
    line-height: 46px;
  `,
  h3: css`
    font-size: 22px;
    line-height: 33px;
  `,
  h4: css`
    font-size: 18px;
    line-height: 27px;
  `,
  h5: css`
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
  `,
};

const StyledPreHeader = styled.p`
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

// Paragraph syles
const baseTextStyles = css`
  color: ${PARAGRAPH_TEXT};
  font-family: ${ROBOTO};
  &.dark {
    color: ${GREY_4};
  }
`;

const StyledSubHeader = styled.p`
  ${baseTextStyles}
  font-size: 20px;
  font-weight: 300;
  line-height: 26px;
`;

const paragraphStyles = css`
  ${baseTextStyles}
  font-size: 16px;
  line-height: 28px;
`;

const codeStyle = css`
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

const linkStyles = css`
  color: ${ORANGE_PRIMARY};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// List styles
const listStyles = css`
  ${baseTextStyles}
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;
  > li {
    margin-bottom: 8px;
  }
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
  <h1
    css={[headingStyles.global, headingStyles.h1]}
    className={classnames({ dark: isDark })}
  >
    {children}
  </h1>
);

export const H2 = ({ children, isDark }: Props) => (
  <h2
    css={[headingStyles.global, headingStyles.h2]}
    className={classnames({ dark: isDark })}
  >
    {children}
  </h2>
);

export const H3 = ({ children, isDark }: Props) => (
  <h3
    css={[headingStyles.global, headingStyles.h3]}
    className={classnames({ dark: isDark })}
  >
    {children}
  </h3>
);

export const H4 = ({ children, isDark }: Props) => (
  <h4
    css={[headingStyles.global, headingStyles.h4]}
    className={classnames({ dark: isDark })}
  >
    {children}
  </h4>
);

export const H5 = ({ children, isDark }: Props) => (
  <h5
    css={[headingStyles.global, headingStyles.h5]}
    className={classnames({ dark: isDark })}
  >
    {children}
  </h5>
);

export const SubHeader = ({ children, isDark }: Props) => (
  <StyledSubHeader className={classnames({ dark: isDark })}>
    {children}
  </StyledSubHeader>
);

export const Paragraph = ({ children, isDark }: Props) => (
  <p css={paragraphStyles} className={classnames({ dark: isDark })}>
    {children}
  </p>
);

export const UnorderedList = ({ children, isDark }: Props) => (
  <ul
    css={css`
      ${listStyles}
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
      ${listStyles}
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
      ${baseTextStyles}
    `}
    className={classnames({ dark: isDark })}
  >
    {children}
  </blockquote>
);

export const InlineCode = ({ children, isDark }: Props) => (
  <code css={codeStyle} className={classnames({ dark: isDark })}>
    {children}
  </code>
);

export const Link = ({ text, href }: LinkProps) => (
  <a css={linkStyles} href={href}>
    {text}
  </a>
);

export const MDXTypographyWrapper = ({ children }: { children: any }) => (
  <div
    css={css`
      padding: 20px;

      @media (${minWidth(BREAKPOINT_IPAD)}) {
        padding: 20px 40px;
      }

      > h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        ${headingStyles.global.styles}
      }

      > h1 {
        ${headingStyles.h1.styles}
      }

      > h2 {
        ${headingStyles.h2.styles}
      }

      > h3 {
        ${headingStyles.h3.styles}
      }

      > h4 {
        ${headingStyles.h4.styles}
      }

      > h5 {
        ${headingStyles.h5.styles}
      }

      > p,
      blockquote {
        ${paragraphStyles.styles}

        > code {
          ${codeStyle.styles}
        }
      }

      a {
        ${linkStyles.styles}
      }

      ol,
      ul {
        ${listStyles.styles}
      }
    `}
  >
    {children}
  </div>
);
