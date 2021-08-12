/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import ModalImage from "react-modal-image";
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
  expand?: boolean;
};

function Image({ src, alt, noborder, expand }: Props) {
  return (
    // using <React.Fragment> instead of the shorthand "<>...</>"
    // Storybook build was failing with error:
    // "transform-react-jsx: pragma has been set but pragmaFrag has not been set"
    <React.Fragment>
      {expand ? (
        <div css={imageStyles}>
          <ModalImage
            small={src}
            large={src}
            alt={alt}
            imageBackgroundColor="#fff"
            className="imageStyles"
          />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          css={imageStyles}
          className={classnames({ noborder })}
        />
      )}
    </React.Fragment>
  );
}

export default Image;
