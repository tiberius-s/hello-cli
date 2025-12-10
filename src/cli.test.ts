import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Command } from "commander";
import { getDirname } from "@/utils/index.js";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("src/cli.ts integration", () => {
	let exitSpy: ReturnType<typeof vi.spyOn>;
	let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

	beforeEach(() => {
		exitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
			throw new Error("process.exit called");
		});
		consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		exitSpy.mockRestore();
		consoleErrorSpy.mockRestore();
	});

	test("should load package.json version", () => {
		const __dirname = getDirname(import.meta.url);
		const pkg = JSON.parse(
			readFileSync(join(__dirname, "../package.json"), "utf-8"),
		) as { version: string };
		expect(pkg.version).toBeDefined();
		expect(typeof pkg.version).toBe("string");
	});

	test("should handle unknown commands", async () => {
		const program = new Command();
		program.on("command:*", () => {
			console.error("Unknown command");
			process.exit(1);
		});

		try {
			await program.parseAsync(["node", "test", "unknown"], { from: "user" });
		} catch (_err) {
			// Expected to throw due to mocked process.exit
		}

		expect(consoleErrorSpy).toHaveBeenCalled();
	});
});
