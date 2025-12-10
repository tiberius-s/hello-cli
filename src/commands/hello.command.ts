import { Command } from "commander";

/**
 * Handler function for the hello command
 * @param name - The name to greet (defaults to "friend")
 * @param options - Command options
 * @param options.yell - Whether to output in uppercase
 */
export function helloHandler(
	name = "friend",
	options?: Record<string, unknown>,
): void {
	if (options?.yell) {
		console.log(`Hello, ${name}.`.toUpperCase());
		return;
	}
	console.log(`Hello, ${name}.`);
}

/**
 * Creates and configures the hello command
 * @returns Configured Commander.js Command instance
 */
export function helloCommand(): Command {
	const hello = new Command("hello");

	hello
		.argument("[name]")
		.option("-y, --yell", "ALL CAPS!")
		.action(helloHandler);

	return hello;
}
