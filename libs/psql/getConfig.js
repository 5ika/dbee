const chalk = require("chalk");
const getConfig = require("../../libs/config/get");

const defaultConfig = {
  host: "localhost",
  username: "postgres",
  password: null,
  useSSL: false,
  port: 5432,
};

const getPsqlConfig = psqlName => {
  if (psqlName === "localhost") {
    console.log(chalk.grey("Use default PSQL config"));
    return defaultConfig;
  }
  const config = getConfig(`psql.${psqlName}`);
  if (!config) throw new Error(`No config found for PSQL server '${psqlName}'`);
  return config;
};

module.exports = getPsqlConfig;
