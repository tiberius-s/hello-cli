import { describe, expect, test } from "vitest";
import { readFileSync } from "node:fs";

describe("Module Format Verification", () => {
  describe("ESM Output", () => {
    test("should use import/export syntax", () => {
      const cliContent = readFileSync("./build/esm/src/cli.js", "utf-8");
      expect(cliContent).toContain("import");
      expect(cliContent).not.toContain('require("');
      expect(cliContent).not.toContain("exports.");
    });

    test("should resolve path aliases to relative imports", () => {
      const cliContent = readFileSync("./build/esm/src/cli.js", "utf-8");
      // Should not contain @ alias in output
      expect(cliContent).not.toContain("@/commands");
      expect(cliContent).not.toContain("@/utils");
      // Should contain relative paths instead
      expect(cliContent).toContain("./commands");
      expect(cliContent).toContain("./utils");
    });

    test("should have source maps", () => {
      const cliMapContent = readFileSync("./build/esm/src/cli.js.map", "utf-8");
      const sourceMap = JSON.parse(cliMapContent);
      expect(sourceMap.version).toBe(3);
      expect(sourceMap.sources).toBeDefined();
    });
  });

  describe("CJS Output", () => {
    test("should use require/exports syntax", () => {
      const cliContent = readFileSync("./build/cjs/src/cli.js", "utf-8");
      expect(cliContent).toContain("require(");
      expect(cliContent).toContain("exports");
      expect(cliContent).not.toContain("import {");
    });

    test("should resolve path aliases to relative requires", () => {
      const cliContent = readFileSync("./build/cjs/src/cli.js", "utf-8");
      // Should not contain @ alias in output
      expect(cliContent).not.toContain("@/commands");
      expect(cliContent).not.toContain("@/utils");
      // Should contain relative paths instead
      expect(cliContent).toContain("./commands");
      expect(cliContent).toContain("./utils");
    });

    test("should have source maps", () => {
      const cliMapContent = readFileSync("./build/cjs/src/cli.js.map", "utf-8");
      const sourceMap = JSON.parse(cliMapContent);
      expect(sourceMap.version).toBe(3);
      expect(sourceMap.sources).toBeDefined();
    });
  });

  describe("Build Structure", () => {
    test("should have executables with shebangs", () => {
      const esmCli = readFileSync("./build/esm/cli.js", "utf-8");
      const cjsCli = readFileSync("./build/cjs/cli.js", "utf-8");

      expect(esmCli).toMatch(/^#!\/usr\/bin\/env node/);
      expect(cjsCli).toMatch(/^#!\/usr\/bin\/env node/);
    });

    test("should have preserved directory structure", () => {
      const { existsSync } = require("node:fs");

      // Check ESM structure
      expect(existsSync("./build/esm/src/cli.js")).toBe(true);
      expect(existsSync("./build/esm/src/commands/hello.command.js")).toBe(
        true
      );
      expect(existsSync("./build/esm/src/utils/dirname.js")).toBe(true);

      // Check CJS structure
      expect(existsSync("./build/cjs/src/cli.js")).toBe(true);
      expect(existsSync("./build/cjs/src/commands/hello.command.js")).toBe(
        true
      );
      expect(existsSync("./build/cjs/src/utils/dirname.js")).toBe(true);
    });

    test("should not include test files in build output", () => {
      const { existsSync } = require("node:fs");

      expect(existsSync("./build/esm/src/cli.test.js")).toBe(false);
      expect(existsSync("./build/cjs/src/cli.test.js")).toBe(false);
      expect(existsSync("./build/esm/src/commands/hello.command.test.js")).toBe(
        false
      );
      expect(existsSync("./build/cjs/src/commands/hello.command.test.js")).toBe(
        false
      );
    });
  });
});
