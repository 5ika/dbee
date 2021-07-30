exports.command = "db <cmd>";
exports.aliases = ["$0"];
exports.desc = "Manage databases";
exports.builder = yargs => yargs.commandDir("db");
exports.handler = argv => {
  console.log(argv);
};
