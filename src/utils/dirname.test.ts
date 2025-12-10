import { describe, expect, test } from "vitest";
import { getDirname } from "./dirname.js";

describe("src/utils/dirname.ts", () => {
	test("should return directory path from file URL", () => {
		const result = getDirname(import.meta.url);
		expect(result).toContain("src/utils");
		expect(result).not.toContain("dirname.test.ts");
	});

	test("should handle file:// protocol URLs", () => {
		const testUrl = "file:///Users/test/project/src/file.ts";
		const result = getDirname(testUrl);
		expect(result).toBe("/Users/test/project/src");
	});
});
