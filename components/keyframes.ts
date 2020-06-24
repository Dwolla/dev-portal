import { keyframes } from "@emotion/core";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const slideIn = keyframes`
  0% {
    transform: translate(0, 30px);
  }
  100% {
    transform: translate(0);
  }
`;

export const slideOut = keyframes`
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(0, -30px);
  }
`;
