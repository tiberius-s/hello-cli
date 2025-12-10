# Changelog

All notable changes to this project will be documented in this file.

## [0.3.2] - 2025-12-10

### Changed

- **CI**: Main-only triggers, concurrency cancellation, Node 20/22 matrix, unit tests run with coverage
- **Tests**: Unit and integration suites split into separate Vitest configs
- **Build**: CI builds once (`build:ci`) before running integration tests; Codecov upload is best-effort

## [0.3.1] - 2025-12-09

### Changed

- **Build**: Simplified to direct SWC outputs plus a lightweight `add-shebang.js` script
- **Docs**: README "How It Works" refreshed for the new build shape
- **CI**: Added GitHub Actions on Node 20/22

## [0.3.0] - 2025-12-09

### Added

- **Dual Outputs**: ESM and CJS builds with source maps and path alias resolution
- **Tests**: 27 total (unit + integration) plus coverage; integration suite validates build outputs
- **Docs**: README expanded; JSDoc coverage improved

### Changed

- **Tooling**: ESLint/Prettier replaced by Biome; Vitest adopted with coverage
- **Runtime**: Node requirement raised to 20+ for stable ESM; build scripts split per format

### Removed

- Legacy lint/format configs and the single `.swcrc`
- Unreachable Node version guard

### Fixed

- Test files excluded from builds; aliases resolved correctly; build dir no longer scanned by tests

### Dependencies Updated

- TypeScript, SWC, Commander, Vitest, Biome, tsc-alias, @vitest/coverage-v8

### Breaking Changes

- Requires Node 20+ and dual ESM/CJS outputs; exports now specify import/require conditions
