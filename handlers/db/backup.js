const chalk = require("chalk");
const S3Client = require("../../libs/s3/client");
const execPsqlCommand = require("../../libs/psql/shellCmd");
const getPsqlConfig = require("../../libs/psql/getConfig");
const getS3Config = require("../../libs/s3/getConfig");
const { splitPsqlParts } = require("./_utils");

const DUMP_DIR = "/tmp/";

const bckp = async params => {
  const { s3Name } = params;
  const { psqlName, dbName } = splitPsqlParts(params["psqlName/dbName"]);
  const psqlConfig = getPsqlConfig(psqlName);
  const s3Config = getS3Config(s3Name);
  const date = new Date().toISOString();
  const fileName = `${dbName}.${psqlName}.${date}.bak`;
  const dumpPath = `${DUMP_DIR}${fileName}`;

  try {
    console.log(
      chalk.greenBright(
        `Dumping ${dbName} database from ${psqlName} to ${dumpPath}`
      )
    );
    await dumpDatabase(dumpPath, dbName, psqlConfig);
    console.log(
      chalk.greenBright(`Uploading ${fileName} to ${s3Config.name} S3 server`)
    );
    await pushToS3(s3Config, { dumpPath, fileName });
    console.log(chalk.greenBright("Done."));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

const dumpDatabase = (dumpPath, dbName, psqlConfig) =>
  execPsqlCommand(`pg_dump -Fc -f "${dumpPath}" ${dbName}`, psqlConfig);

const pushToS3 = async (s3Config, { dumpPath, fileName }) =>
  S3Client(s3Config).push({ dumpPath, fileName });

module.exports = bckp;
