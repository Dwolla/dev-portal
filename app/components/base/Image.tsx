/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import classnames from "../../modules/classnames";
import { GREY_2 } from "../colors";

export const imageStyles = css`
  display: block;
  max-width: 100%;
  border: 1px solid ${GREY_2};
  margin: 29px auto;
  &.noborder {
    border: unset;
  }
`;

type Props = {
  src: string;
  alt: string;
  noborder?: boolean;
};

const Image = ({ src, alt, noborder }: Props) => (
  <img
    src={src}
    alt={alt}
    css={imageStyles}
    className={classnames({ noborder })}
  />
);

export default Image;
