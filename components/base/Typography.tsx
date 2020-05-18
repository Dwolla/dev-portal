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
  GREY_2,
} from "../colors";

// Heading styles
export const headingStyles = {
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
    margin-top: 0;
    margin-bottom: 26px;
  `,
  h2: css`
    font-size: 30px;
    line-height: 46px;
    margin-top: 26px;
    margin-bottom: 26px;
  `,
  h3: css`
    font-size: 22px;
    line-height: 33px;
    margin-top: 29px;
    margin-bottom: 29px;
  `,
  h4: css`
    font-size: 18px;
    line-height: 27px;
    margin-top: 36px;
    margin-bottom: 26px;
  `,
  h5: css`
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1px;
    margin-top: 36px;
    margin-bottom: 26px;
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
  margin-top: 0;
  margin-bottom: 15px;
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
  margin-top: 26px;
  margin-bottom: 26px;
`;

export const paragraphStyles = css`
  ${baseTextStyles}
  font-size: 16px;
  line-height: 28px;
  margin-top: 26px;
  margin-bottom: 29px;
`;

export const codeStyles = css`
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

export const linkStyles = css`
  color: ${ORANGE_PRIMARY};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// List styles
export const listStyles = css`
  ${baseTextStyles}
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;
  margin-top: 26px;
  margin-bottom: 29px;
  > li {
    margin-bottom: 8px;
  }
`;

// Table styles
export const tableStyles = css`
  border-spacing: 0;

  thead {
    th {
      font-family: ${ROBOTO};
      font-weight: 500;
      font-size: 13px;
      color: ${HEADLINE_TEXT};
      line-height: 17px;
      padding: 8px 16px;
    }
  }

  tbody {
    tr {
      box-shadow: 0 0 0 1px ${GREY_2}; /* https://stackoverflow.com/a/48831092 */

      &:nth-of-type(1) {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }

      &:nth-of-type(odd) {
        background: ${GREY_1};
      }
    }

    td {
      font-family: ${ROBOTO};
      font-size: 14px;
      line-height: 20px;
      color: ${PARAGRAPH_TEXT};
      padding: 10px 16px;
    }
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
  <code css={codeStyles} className={classnames({ dark: isDark })}>
    {children}
  </code>
);

export const Link = ({ text, href }: LinkProps) => (
  <a css={linkStyles} href={href}>
    {text}
  </a>
);

export const Table = styled.table(tableStyles);
