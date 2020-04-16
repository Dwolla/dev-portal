import { configure, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

// automatically import all files ending in *.stories.tsx
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);

// Globally configure viewport addon for testing responsiveness in Storybook
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
