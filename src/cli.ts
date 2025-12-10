import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Command } from "commander";

import { helloCommand } from "@/commands/index.js";
import { getDirname } from "@/utils/index.js";

const currentDir = getDirname(import.meta.url);
const pkg = JSON.parse(
	readFileSync(join(currentDir, "../../../package.json"), "utf-8"),
) as { version: string };

const EXIT_FAILURE = 1;

const program = new Command();

program
	.name("hello-cli")
	.description("A basic CLI written in TypeScript")
	.version(pkg.version);

program.addCommand(helloCommand());

// Catch unknown commands with helpful message
program.on("command:*", () => {
	console.error(`\nError: Unknown command '${program.args.join(" ")}'\n`);
	program.outputHelp();
	process.exit(EXIT_FAILURE);
});

/**
 * Main entry point for the CLI application
 */
async function main(): Promise<void> {
	try {
		await program.parseAsync(process.argv);
	} catch (err) {
		console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
		process.exit(EXIT_FAILURE);
	}
}

main();
