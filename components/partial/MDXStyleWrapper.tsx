import { css } from "@emotion/core";
import { breakUp } from "../breakpoints";
import {
  headingStyles,
  paragraphStyles,
  codeStyles,
  linkStyles,
  listStyles,
} from "../base/Typography";
import { imageStyles } from "../base/Image";

const MDXStyleWrapper = ({ children }: { children: any }) => (
  <div
    css={css`
      padding: 20px;

      @media (${breakUp("md")}) {
        padding: 20px 40px;
      }

      > h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        ${headingStyles.global.styles}
        code {
          ${codeStyles.styles}
          font-size: inherit;
        }
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

      > p:not([class]),
      blockquote {
        ${paragraphStyles.styles}

        > code {
          ${codeStyles.styles}
        }

        > img {
          ${imageStyles.styles}
        }
      }

      p {
        code {
          ${codeStyles.styles}
        }
      }

      > table,
      th,
      td {
        code {
          ${codeStyles.styles}
        }
      }

      a:not([class]) {
        ${linkStyles.styles}
      }

      > ol,
      > ul {
        ${listStyles.styles}
        code {
          ${codeStyles.styles}
        }
      }

      > img {
        ${imageStyles.styles}
      }

      span {
        code {
          ${codeStyles.styles}
        }
      }
    `}
  >
    {children}
  </div>
);

export default MDXStyleWrapper;
