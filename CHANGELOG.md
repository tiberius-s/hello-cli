# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2025-12-09

### Added

- **Dual Build System**: Project now compiles to both ESM (`build/esm/`) and CommonJS (`build/cjs/`) formats with proper module format markers
- **Path Aliases**: TypeScript path aliases (`@/*`) now work throughout the codebase and are resolved to relative paths in compiled output
- **Build Validation**: Code quality checks (format, lint, typecheck) run automatically in the prebuild step before compilation
- **Source Maps**: Both ESM and CJS builds include source maps for debugging
- **Dynamic Executables**: Shebangs dynamically wrapped for both module formats via `insert-shebang.sh`
- **ESM dirname Utility**: New `getDirname()` utility for ES module-compatible directory resolution
- **Comprehensive Tests**:
  - 5 unit tests for CLI and command logic
  - 2 unit tests for dirname utility
  - 9 integration tests for build outputs (ESM and CJS execution)
  - 9 integration tests for module format verification and structure
  - Total: 25+ tests with 100% code coverage
- **Integration Test Suite**: Dedicated `tests/integration/` directory with build output and module format validation
- **JSDoc Comments**: Added documentation to all functions for better IDE support and clarity
- **Improved README**: Comprehensive documentation with features list, usage examples, and technical architecture explanation

### Changed

- **Tooling Migration**: Replaced ESLint + Prettier with Biome for unified linting and formatting
- **Node Version Requirement**: Updated from Node 16+ to Node 20+ for stable ESM support
- **Build Scripts**: Restructured build pipeline with separate configurations for ESM and CJS
- **CLI Implementation**: Enhanced with better error handling, version management, and command validation
- **Testing Framework**: Updated from Vite's test to dedicated Vitest with coverage integration
- **Project Structure**: Reorganized to include utilities folder and proper test file placement

### Removed

- ESLint configuration and plugins
- Prettier configuration
- Old single build configuration (`.swcrc`)
- Version check code that couldn't be reached in ESM environment

### Fixed

- Test file exclusion from production builds (prevents `.test.js` in output)
- Path alias transformation for both module formats
- Vitest configuration to prevent test discovery in build directory
- CJS module format declaration via `build/cjs/package.json`

### Technical Details

**Build Process:**

1. `npm run build` triggers prebuild (format:fix → lint → typecheck)
2. Parallel compilation: `.swcrc-esm` and `.swcrc-cjs` compile source
3. Post-compile: `tsc-alias` transforms `@/` imports to relative paths
4. Postbuild: `insert-shebang.sh` creates executable wrappers for both formats

**Module Format Support:**

- ESM: Uses `import()`/`export`, targets modern Node.js
- CJS: Uses `require()`/`exports`, includes `type: "commonjs"` marker for compatibility

**Dependencies Updated:**

- TypeScript: 4.9.5 → 5.9.3
- SWC: 1.3.35 → 1.15.3
- Commander: 10.0.0 → 14.0.2
- Vitest: 0.28.5 → 4.0.15
- Biome: Added as replacement for ESLint + Prettier
- tsc-alias: Added for path alias transformation
- @vitest/coverage-v8: Added for coverage reporting

### Breaking Changes

- Requires Node.js 20+ (was 16+)
- Single build output replaced with dual ESM/CJS structure
- Package exports field now specifies import/require conditions
- CLI now uses Biome instead of ESLint/Prettier
