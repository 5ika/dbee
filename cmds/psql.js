exports.command = "psql <cmd>";
exports.desc = "Manage Postgres servers";
exports.builder = yargs => yargs.commandDir("psql");
exports.handler = argv => {
  console.log(argv);
};
