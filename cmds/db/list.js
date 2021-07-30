const ListDb = require("../../handlers/db/list");

exports.command = "list [s3Name]";
exports.aliases = ["ls"];
exports.desc = "List databases available on S3 server";
exports.builder = function (yargs) {};
exports.handler = ListDb;
