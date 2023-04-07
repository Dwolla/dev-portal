// https://github.com/zeit/next.js/tree/canary/examples/with-jest
module.exports = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.(md|mdx)$": "<rootDir>/.jest/jest-transformer-next-mdx-enhanced",
  },
  collectCoverageFrom: [
    "{app,components}/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.import.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/.jest/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/.pnpm-store/", "/node_modules/", "/.next/"],
  transformIgnorePatterns: [
    "/.pnpm-store/",
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(png|gif|jpg)$": "<rootDir>/.jest/__mocks__/imageMock.js",
    "^.+\\.svg$": "<rootDir>/.jest/__mocks__/svgMock.js",
    "^.+\\.css$": "<rootDir>/.jest/__mocks__/cssMock.js",
  },
};
