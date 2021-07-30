const chalk = require("chalk");
const S3Client = require("../../libs/s3/client");
const getS3Config = require("../../libs/s3/getConfig");

const list = async ({ s3Name }) => {
  const s3Config = getS3Config(s3Name);
  const files = await S3Client(s3Config).list();
  const formatedList = files.map(file => `- ${file.name}`);

  console.log(`Available dumps on ${s3Config.name}:\n`);
  console.log(chalk.yellowBright(`${formatedList.join("\n")}\n`));
};

module.exports = list;
