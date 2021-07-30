const RemovePsql = require("../../handlers/psql/remove");

exports.command = "remove <psqlName>";
exports.aliases = ["rm <psqlName>"];
exports.desc = "Remove Postgres server from config";
exports.builder = function (yargs) {};
exports.handler = RemovePsql;
