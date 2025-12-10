import { describe, expect, test } from "vitest";
import { execSync } from "node:child_process";

describe("ESM Build Output", () => {
  test("should execute ESM CLI successfully", () => {
    const output = execSync("./build/esm/src/cli.js hello World", {
      encoding: "utf-8",
    });
    expect(output.trim()).toBe("Hello, World.");
  });

  test("should support --version flag", () => {
    const output = execSync("./build/esm/src/cli.js --version", {
      encoding: "utf-8",
    });
    expect(output.trim()).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("should support --help flag", () => {
    const output = execSync("./build/esm/src/cli.js --help", {
      encoding: "utf-8",
    });
    expect(output).toContain("Usage: hello-cli");
    expect(output).toContain("Commands:");
  });

  test("should support --yell option", () => {
    const output = execSync("./build/esm/src/cli.js hello world --yell", {
      encoding: "utf-8",
    });
    expect(output.trim()).toBe("HELLO, WORLD.");
  });
});

describe("CJS Build Output", () => {
  test("should execute CJS CLI successfully", () => {
    const output = execSync("./build/cjs/src/cli.js hello World", {
      encoding: "utf-8",
    });
    expect(output.trim()).toBe("Hello, World.");
  });

  test("should support --version flag", () => {
    const output = execSync("./build/cjs/src/cli.js --version", {
      encoding: "utf-8",
    });
    expect(output.trim()).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test("should support --help flag", () => {
    const output = execSync("./build/cjs/src/cli.js --help", {
      encoding: "utf-8",
    });
    expect(output).toContain("Usage: hello-cli");
    expect(output).toContain("Commands:");
  });

  test("should have CommonJS package.json marker", () => {
    const { readFileSync } = require("node:fs");
    const pkg = JSON.parse(readFileSync("./build/cjs/package.json", "utf-8"));
    expect(pkg.type).toBe("commonjs");
  });

  test("should support --yell option", () => {
    const output = execSync("./build/cjs/src/cli.js hello world --yell", {
      encoding: "utf-8",
    });
    expect(output.trim()).toBe("HELLO, WORLD.");
  });
});
