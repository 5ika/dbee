const addS3 = require("../../handlers/s3/add");

exports.command = "add <s3Name> <host>";
exports.desc = "Add S3 server";
exports.builder = function (yargs) {
  return yargs.options({
    accessKey: {
      demandOption: true,
      alias: "a",
      describe: "Access key for the S3 server",
    },
    secretKey: {
      demandOption: true,
      alias: "s",
      describe: "Secret key fot the S3 server",
    },
    port: {
      alias: "p",
      describe: "S3 server port",
      default: 443,
    },
    useSSL: {
      alias: "s",
      describe: "Use SSL for server connection",
      default: true,
    },
    bucket: {
      alias: "b",
      describe: "S3 bucket to use",
      default: "dbee",
    },
  });
};
exports.handler = addS3;
