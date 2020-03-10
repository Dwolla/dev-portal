// https://github.com/zeit/next.js/tree/canary/examples/with-jest
module.exports = {
  transform: {
    "^.+\\.(md|mdx)$":
      "<rootDir>/config/jest/jest-transformer-next-mdx-enhanced",
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverageFrom: [
    "{app,components}/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.import.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/config/jest/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(png|svg)$": "<rootDir>/config/jest/__mocks__/imageMock.js",
  },
};
