const chalk = require("chalk");
const exec = require("child_process").exec;

const execPsqlCommand = async (command = "", psqlConfig) => {
  const { host, port, username, password } = psqlConfig;
  let shellCmd = `${command} -h ${host} -p ${port} -U ${username}`;

  console.log(chalk.grey(shellCmd));

  if (password) shellCmd = `PGPASSWORD=${password} ${shellCmd}`;

  return new Promise((resolve, reject) => {
    exec(shellCmd, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
};

module.exports = execPsqlCommand;
