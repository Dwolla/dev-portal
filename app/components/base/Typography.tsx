import styled from "@emotion/styled";
import { css } from "@emotion/react";
import classnames from "../../modules/classnames";
import { ROBOTO, MONACO } from "../typography";
import {
  WHITE_PRIMARY,
  ORANGE_PRIMARY,
  PURPLE_DARK,
  GREY_1,
  GREY_3,
  GREY_4,
  GREY_14,
  PURPLE_PRIMARY,
} from "../colors";

// Heading styles
export const headingStyles = {
  global: css`
    color: ${PURPLE_PRIMARY};
    font-family: ${ROBOTO};
    font-weight: 300;
    &.dark {
      color: ${WHITE_PRIMARY};
    }
  `,
  h1: css`
    font-size: 42px;
    line-height: 52px;
    margin-top: 26px;
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
    letter-spacing: 1px;
    margin-top: 36px;
    margin-bottom: 26px;
  `,
};

const StyledPreHeader = styled.p`
  color: ${PURPLE_PRIMARY};
  text-transform: uppercase;
  font-family: ${ROBOTO};
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
  color: ${PURPLE_PRIMARY};
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
  color: ${PURPLE_PRIMARY};
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

export const blockQuoteStyles = css`
  margin: auto;
  code {
    ${codeStyles}
    color: ${PURPLE_PRIMARY};
    background-color: ${GREY_14};
    border-color: ${GREY_4};
  }
`;

export const linkStyles = css`
  color: ${ORANGE_PRIMARY};
  cursor: pointer;
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

export function PreHeader({ children, isDark }: Props) {
  return (
    <StyledPreHeader className={classnames({ dark: isDark })}>
      {children}
    </StyledPreHeader>
  );
}

export function H1({ children, isDark }: Props) {
  return (
    <h1
      css={[headingStyles.global, headingStyles.h1]}
      className={classnames({ dark: isDark })}
    >
      {children}
    </h1>
  );
}

export function H2({ children, isDark }: Props) {
  return (
    <h2
      css={[headingStyles.global, headingStyles.h2]}
      className={classnames({ dark: isDark })}
    >
      {children}
    </h2>
  );
}

export function H3({ children, isDark }: Props) {
  return (
    <h3
      css={[headingStyles.global, headingStyles.h3]}
      className={classnames({ dark: isDark })}
    >
      {children}
    </h3>
  );
}

export function H4({ children, isDark }: Props) {
  return (
    <h4
      css={[headingStyles.global, headingStyles.h4]}
      className={classnames({ dark: isDark })}
    >
      {children}
    </h4>
  );
}

export function H5({ children, isDark }: Props) {
  return (
    <h5
      css={[headingStyles.global, headingStyles.h5]}
      className={classnames({ dark: isDark })}
    >
      {children}
    </h5>
  );
}

export function SubHeader({ children, isDark }: Props) {
  return (
    <StyledSubHeader className={classnames({ dark: isDark })}>
      {children}
    </StyledSubHeader>
  );
}

export function Paragraph({ children, isDark }: Props) {
  return (
    <p css={paragraphStyles} className={classnames({ dark: isDark })}>
      {children}
    </p>
  );
}

export function UnorderedList({ children, isDark }: Props) {
  return (
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
}

export function OrderedList({ children, isDark }: Props) {
  return (
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
}

export function BlockQuote({ children, isDark }: Props) {
  return (
    <blockquote
      css={css`
        ${baseTextStyles}
      `}
      className={classnames({ dark: isDark })}
    >
      {children}
    </blockquote>
  );
}

export function InlineCode({ children, isDark }: Props) {
  return (
    <code css={codeStyles} className={classnames({ dark: isDark })}>
      {children}
    </code>
  );
}

export function Link({ text, href }: LinkProps) {
  return (
    <a css={linkStyles} href={href}>
      {text}
    </a>
  );
}
