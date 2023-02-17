import { Command } from 'commander';

import { helloCommand } from './commands/index.js';

const program = new Command();
program.addCommand(helloCommand());
program.exitOverride(); // allows us to handle the error before exit

async function main() {
  try {
    await program.parseAsync(process.argv);
  } catch (err) {
    console.error(`ERR: ${err}`); // handle the error your way
    process.exit(1);
  }
}

main();
