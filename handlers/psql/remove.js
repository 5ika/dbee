const remove = require("../../libs/config/remove");

const removePsql = params => {
  const { psqlName } = params;
  remove("psql", psqlName);
  console.log(`Postgres server ${psqlName} removed from config`);
};

module.exports = removePsql;
