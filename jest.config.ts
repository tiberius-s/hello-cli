import type { InitialOptionsTsJest } from "ts-jest/dist/types";
import { defaultsESM as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
  preset: "ts-jest",
  coverageDirectory: "./coverage",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!src/cli.ts"],
  coverageReporters: ["html", "json", "text-summary"],
  transform: {
    ...tsjPreset.transform,
  },
  extensionsToTreatAsEsm: [".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
