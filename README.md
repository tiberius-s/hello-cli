# hello-cli

A modern TypeScript CLI starter that demonstrates how to build production-ready command-line tools. The project is designed to serve as a reference for best practices and can be used as a starting point for your own CLI projects.

## Features

- ✨ Dual ESM and CommonJS builds with proper module format
- 🎯 Path aliases with `@/*` prefix (transformed in output)
- 🚀 Fast compilation with SWC
- 🧪 Comprehensive testing with 100% code coverage
- 📝 Formatting and linting with Biome
- 🔧 TypeScript 5.x with strict mode
- 📦 Optimized for Node.js 20+
- 🎁 Production-ready publishing configuration
- 📋 Source maps for debugging

## Installation

To use hello-cli globally, install it via npm:

```bash
npm install -g hello-cli
```

For local development, clone the repo, install dependencies, build, and link:

```bash
npm install
npm run build
npm link
```

## Usage

Once installed, the `hello-cli` command is available globally:

```bash
hello-cli hello World
# Output: Hello, World.

hello-cli hello "GitHub Copilot" --yell
# Output: HELLO, GITHUB COPILOT.
```

The main command is `hello <name>`, which greets the specified name. You can pass `--yell` or `-y` to output the greeting in all caps. The CLI also supports standard options like `--version` and `--help` for version information and command documentation.

## Development

Run `npm run build` to compile to both ESM and CommonJS. Use `npm run build:esm` or `npm run build:cjs` for a single format.

Test with `npm test` for unit tests or `npm run test:integration` for build output validation. Use `npm run test:cov` for coverage details.

Code quality is handled automatically via the prebuild step: `npm run typecheck`, `npm run lint`, and `npm run format` check for issues. Add `:fix` to any of these commands to auto-fix.

Run `npm run clean` to remove build artifacts and node_modules.

## How It Works

The dual build system uses SWC with two separate configurations: `.swcrc-esm` compiles source code to ES modules in `build/esm/`, while `.swcrc-cjs` compiles the same source to CommonJS in `build/cjs/`. Both configs reference `@/` path aliases defined in `tsconfig.json`.

After SWC compiles, `tsc-alias` transforms those `@/` imports to relative paths in both output directories so they resolve correctly without TypeScript at runtime. Finally, `insert-shebang.sh` wraps both compiled `cli.js` files with executable shebangs—the ESM version uses dynamic `import()`, the CJS version uses `require()` and generates a `package.json` marker.

The build validates code quality first: `npm run build` runs the prebuild step (type checking, linting, formatting) before compilation, ensuring only clean code makes it to the output.

## Technologies

- [TypeScript](https://www.typescriptlang.org/) 5.x - Language with strict mode
- [SWC](https://swc.rs/) - Fast TypeScript compiler for dual ESM/CJS
- [Commander.js](https://github.com/tj/commander.js) 14.x - CLI framework
- [Vitest](https://vitest.dev/) 4.x - Unit and integration testing
- [Biome](https://biomejs.dev/) 2.x - Formatter and linter (replaces ESLint/Prettier)
- [tsc-alias](https://github.com/justkey007/tsc-alias) - Path alias resolution post-compilation
- [Node.js](https://nodejs.org/) 20+ - Runtime

## License

MIT © Tiberius Silivestru
