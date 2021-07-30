#!/usr/bin/env node

require("yargs/yargs")(process.argv.slice(2))
  .scriptName("dbee")
  .commandDir("cmds")
  .demandCommand()
  .help().argv;
