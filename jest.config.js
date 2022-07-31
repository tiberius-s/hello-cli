import fs from 'fs';
import { fileURLToPath, URL } from 'url';

const swcConfig = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL('./.swcrc', import.meta.url)), 'utf8'),
);
swcConfig.sourceMaps = 'inline';

const config = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(?:spec|test).ts'],
  transform: {
    '^.*\\.ts$': ['@swc/jest', { ...swcConfig }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/cli.ts',
    '!{node_modules,build,coverage,__tests__}/**/*',
  ],
  coverageReporters: ['html', 'json', 'text'],
};

export default config;
