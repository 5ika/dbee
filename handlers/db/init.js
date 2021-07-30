const chalk = require("chalk");
const S3Client = require("../../libs/s3/client");
const execPsqlCommand = require("../../libs/psql/shellCmd");
const getPsqlConfig = require("../../libs/psql/getConfig");
const getS3Config = require("../../libs/s3/getConfig");
const { splitPsqlParts, splitS3Parts } = require("./_utils");

const DUMP_DIR = "/tmp/";

const init = async params => {
  const { s3Name, fileName } = splitS3Parts(params["s3Name/fileName"]);
  const { psqlName, dbName } = splitPsqlParts(params["psqlName/dbName"]);
  const psqlConfig = getPsqlConfig(psqlName);
  const s3Config = getS3Config(s3Name);
  const dumpPath = `${DUMP_DIR}${fileName}`;

  try {
    console.log(
      chalk.greenBright(`Downloading ${fileName} from ${s3Name} server`)
    );
    await downloadDump(s3Config, { dumpPath, fileName });
    console.log(
      chalk.greenBright(
        `Restoring ${dbName} database to ${psqlName} from ${fileName}`
      )
    );
    await restoreDatabase(dumpPath, dbName, psqlConfig);
    console.log(chalk.greenBright("Done."));
  } catch (error) {
    console.error(chalk.redBright(error));
  }
};

const downloadDump = async (s3Config, { dumpPath, fileName }) =>
  S3Client(s3Config).pull({ dumpPath, fileName });

const restoreDatabase = async (dumpPath, dbName, psqlConfig) => {
  await execPsqlCommand(`psql -c 'CREATE DATABASE ${dbName}'`, psqlConfig);

  if (psqlConfig.timescale) {
    await execPsqlCommand(
      `psql -c 'SELECT timescaledb_pre_restore();' -d ${dbName}`,
      psqlConfig
    );
  }

  await execPsqlCommand(
    `pg_restore -Fc -d ${dbName} "${dumpPath}"`,
    psqlConfig
  );

  if (psqlConfig.timescale) {
    await execPsqlCommand(
      `psql -c 'SELECT timescaledb_post_restore();' -d ${dbName}`,
      psqlConfig
    );
  }
};

module.exports = init;
