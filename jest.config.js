export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    "^crisp-game-lib$": "<rootDir>/test/manual-mocks/crisp-game-lib-stub.ts",
    "^(?:../){2,3}(?:src/)?utils/view.ts$":
      "<rootDir>/test/manual-mocks/utils-view-stub.ts",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transformIgnorePatterns: ["/node_modules/"],
};
