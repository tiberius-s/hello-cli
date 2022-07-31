const fs = require("fs");

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, "utf8"));
swcConfig.sourceMaps = "inline";

module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(?:spec|test).ts"],
  transform: {
    "^.*\\.ts$": ["@swc/jest", { ...swcConfig }],
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/index.ts",
    "!src/cli.ts",
    "!{node_modules,build,coverage,__tests__}/**/*",
  ],
  coverageReporters: ["html", "json", "text"],
};
