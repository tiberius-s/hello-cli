import { Command } from 'commander';

import { helloCommand } from './commands/index.js';

const program = new Command();
program.addCommand(helloCommand());
program.exitOverride();

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    // handle the exit your way
    console.error(`ERR: ${err}`);
    process.exit(1);
  }
}

main();
