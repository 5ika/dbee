const chalk = require("chalk");
const get = require("../../libs/config/get");

const ListS3 = params => {
  const s3Servers = get("s3");

  if (!s3Servers) {
    console.log(chalk.red("You have no S3 server"));
  } else {
    const formatedList = Object.entries(s3Servers).map(
      ([name, info]) => `- ${name} (${info.host})`
    );
    console.log(`This is you configured S3 servers:\n`);
    console.log(chalk.yellowBright(`${formatedList.join("\n")}\n`));
  }
};

module.exports = ListS3;
