#!/usr/bin/env node --experimental-modules=node --experimental-specifier-resolution=node

import { Command } from 'commander';

import { helloCommand } from './commands/index.js';

const program = new Command();

program.addCommand(helloCommand());

program.exitOverride();

// This can all be wrapped in an async main function in case any of the command handlers are asynchronous
try {
  program.parse(process.argv);
} catch (err) {
  // handle the exit your way
  console.error(`ERR: ${err}`);
  process.exit(1);
}
