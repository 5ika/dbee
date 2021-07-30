exports.command = "s3 <cmd>";
exports.desc = "Manage S3 servers";
exports.builder = yargs => yargs.commandDir("s3");
exports.handler = argv => {
  console.log(argv);
};
