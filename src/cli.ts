#!/usr/bin/env node --experimental-modules=node --experimental-specifier-resolution=node

import { Command } from "commander";

import { helloCommand } from "./commands";

const program = new Command();

program.addCommand(helloCommand());

program.exitOverride();

try {
  program.parse(process.argv);
} catch (err) {
  console.error(`ERR: ${err}`);
}
