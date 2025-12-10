# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1] - 2025-12-09

### Changed

- **Build Process Simplification**: Removed wrapper script complexity in favor of direct SWC compilation
- **Postbuild Script**: Replaced `insert-shebang.sh` with lightweight `add-shebang.js` Node script
- **CJS Package Generation**: Now generated inline in build script instead of via wrapper
- **README**: Updated "How It Works" section to reflect simplified build architecture
- **GitHub Actions**: Added CI workflow for automated testing on Node 20 and 22

### Technical Details

Build Process (Simplified):

1. Prebuild: format:fix → lint → typecheck → clean
2. Compile: SWC compiles source to both `build/esm/src/` and `build/cjs/src/`
3. Path Resolution: `tsc-alias` transforms `@/` imports to relative paths
4. Executables: `add-shebang.js` adds shebangs and sets executable permissions
5. CJS Marker: `package.json` with `"type":"commonjs"` created in `build/cjs/`

Entry Points:

- ESM: `build/esm/src/cli.js` (executable)
- CJS: `build/cjs/src/cli.js` (executable)

## [0.3.0] - 2025-12-09

### Added

- **Dual Build System**: Project compiles to both ESM (`build/esm/`) and CommonJS (`build/cjs/`) with proper module format markers
- **Path Aliases**: TypeScript path aliases (`@/*`) work throughout codebase and resolve to relative paths in output
- **Build Validation**: Code quality checks (format, lint, typecheck) run automatically in prebuild step
- **Source Maps**: Both ESM and CJS builds include source maps for debugging
- **ESM dirname Utility**: New `getDirname()` utility for ES module-compatible directory resolution
- **Comprehensive Tests**: 27 total tests (9 unit + 18 integration) with 100% code coverage
- **Integration Test Suite**: Dedicated `tests/integration/` with build output and module format validation
- **JSDoc Comments**: All functions documented for IDE support and clarity
- **Improved README**: Comprehensive documentation with features, usage, and architecture explanation

### Changed

- **Tooling Migration**: Replaced ESLint + Prettier with Biome for unified linting/formatting
- **Node Version**: Updated from 16+ to 20+ for stable ESM support without flags
- **Build Scripts**: Restructured with separate SWC configurations for ESM and CJS
- **CLI Implementation**: Enhanced with better error handling and version management
- **Testing Framework**: Upgraded from Vite test to dedicated Vitest with coverage
- **Project Structure**: Added utilities folder and proper test file organization

### Removed

- ESLint configuration and plugins
- Prettier configuration
- Old single build configuration (`.swcrc`)
- Unreachable Node version check code

### Fixed

- Test file exclusion from production builds
- Path alias transformation for both module formats
- Vitest configuration to prevent test discovery in build directory
- CJS module format declaration

### Dependencies Updated

- TypeScript: 4.9.5 → 5.9.3
- SWC: 1.3.35 → 1.15.3
- Commander: 10.0.0 → 14.0.2
- Vitest: 0.28.5 → 4.0.15
- Biome: 2.3.8 (new)
- tsc-alias: 1.8.16 (new)
- @vitest/coverage-v8: 4.0.15 (new)

### Breaking Changes

- Requires Node.js 20+ (was 16+)
- Dual ESM/CJS structure replaces single build output
- Package exports field specifies import/require conditions
- CLI now uses Biome instead of ESLint/Prettier
