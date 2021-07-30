const initDb = require("../../handlers/db/init");

exports.command = "init [s3Name/]<fileName> [psqlName/]<dbName>";
exports.desc = "Init database from S3 dump";
exports.builder = yargs => yargs.options({});
exports.handler = initDb;
