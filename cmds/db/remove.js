const RemoveDb = require("../../handlers/db/remove.js");

exports.command = "remove [s3Name/]<fileName>";
exports.aliases = ["rm"];
exports.desc = "Remove database dump from S3 server";
exports.builder = function (yargs) {};
exports.handler = RemoveDb;
