/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { GREY_2 } from "../colors";

export const imageStyles = css`
  display: block;
  max-width: 100%;
  border: 1px solid ${GREY_2};
  margin: 29px auto;
`;

type Props = {
  src: string;
  alt: string;
};

const Image = ({ src, alt }: Props) => (
  <img src={src} alt={alt} css={imageStyles} />
);

export default Image;
