const store = require("../../libs/config/store");

const addPsql = params => {
  const {
    psqlName,
    host,
    username,
    useSSL,
    port,
    password,
    timescale,
  } = params;
  store("psql", psqlName, {
    host,
    username,
    useSSL,
    port,
    password,
    timescale,
  });
  console.log(`Postgres server ${psqlName} saved in config`);
};

module.exports = addPsql;
