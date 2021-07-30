const chalk = require("chalk");
const get = require("../../libs/config/get");

const ListPsql = params => {
  const psqlServers = get("psql");

  if (!psqlServers) {
    console.log(chalk.red("You have no Postgres server"));
  } else {
    const formatedList = Object.entries(psqlServers).map(
      ([name, info]) => `- ${name} (${info.host} as ${info.username})`
    );
    console.log(`This is you configured Postgres servers:\n`);
    console.log(chalk.yellowBright(`${formatedList.join("\n")}\n`));
  }
};

module.exports = ListPsql;
