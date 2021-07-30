const ListPsql = require("../../handlers/psql/list");

exports.command = "list";
exports.aliases = ["ls", "l"];
exports.desc = "List Postgress servers";
exports.builder = function (yargs) {};
exports.handler = ListPsql;
