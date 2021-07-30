const backupDb = require("../../handlers/db/backup");

exports.command = "backup [psqlName/]<dbName> [s3Name]";
exports.aliases = ["bckp"];
exports.desc = "Backup database to S3";
exports.builder = yargs => yargs.options({});
exports.handler = backupDb;
