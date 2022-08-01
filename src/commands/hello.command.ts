import { Command } from 'commander';

// export the handler for testing purposes
export function helloHandler(name = 'friend', options?: Record<string, unknown>): void {
  if (options?.yell) {
    console.log(`Hello, ${name}.`.toUpperCase());
    return;
  }
  console.log(`Hello, ${name}.`);
}

export function helloCommand(): Command {
  const hello = new Command('hello');

  hello.argument('[name]').option('-y, --yell', 'ALL CAPS!').action(helloHandler);

  return hello;
}
