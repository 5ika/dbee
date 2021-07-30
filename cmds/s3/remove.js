const RemoveS3 = require("../../handlers/s3/remove");

exports.command = "remove <s3Name>";
exports.aliases = ["rm <s3Name>"];
exports.desc = "Remove S3 server from config";
exports.builder = function (yargs) {};
exports.handler = RemoveS3;
