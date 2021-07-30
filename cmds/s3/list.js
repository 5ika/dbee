const ListS3 = require("../../handlers/s3/list");

exports.command = "list";
exports.aliases = ["ls"];
exports.desc = "List S3 servers";
exports.builder = function (yargs) {};
exports.handler = ListS3;
