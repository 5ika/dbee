const chalk = require("chalk");
const S3Client = require("../../libs/s3/client");
const getS3Config = require("../../libs/s3/getConfig");
const { splitS3Parts } = require("./_utils");

const removeDb = async params => {
  const { s3Name, fileName } = splitS3Parts(params["s3Name/fileName"]);
  const s3Config = getS3Config(s3Name);
  await S3Client(s3Config).remove(fileName);
  console.log(
    chalk.greenBright(`Dump ${fileName} has been removed from ${s3Config.name}`)
  );
};

module.exports = removeDb;
