const addPsql = require("../../handlers/psql/add");

exports.command = "add <psqlName> <host>";
exports.desc = "Add Postgres servers";
exports.builder = function (yargs) {
  return yargs.options({
    username: {
      demandOption: true,
      alias: "u",
      describe: "Username for the Postgres server",
    },
    password: {
      alias: "P",
      describe: "Password for the Postgres server (facultative)",
    },
    port: {
      alias: "p",
      describe: "Postgres server port",
      default: 5432,
    },
    useSSL: {
      alias: "s",
      type: "boolean",
      describe: "Use SSL for server connection",
      default: false,
    },
    timescale: {
      alias: "t",
      type: "boolean",
      describe: "Enable TimescaleDB management for the server",
      default: false,
    },
  });
};
exports.handler = addPsql;
