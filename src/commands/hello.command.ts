import { Command } from "commander";

// export the handler for testing purposes
export function helloAction(name: string = "friend", options?: Record<string, unknown>): void {
  if (options?.yell) {
    console.log(`Hello, ${name}.`.toUpperCase());
    return;
  }
  console.log(`Hello, ${name}.`);
}

export function helloCommand(): Command {
  const hello = new Command("hello");

  hello.argument("[name]").option("-y, --yell", "ALL CAPS!").action(helloAction);

  return hello;
}