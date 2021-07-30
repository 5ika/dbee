const fs = require("fs");
const path = require("path");
const homedir = require("os").homedir();
const CONFIG_PATH = path.join(homedir, ".dbee");

const getConfig = () => {
  createConfigIfNotExists();
  const rawContent = fs.readFileSync(CONFIG_PATH, "utf8");
  return JSON.parse(rawContent);
};

const storeConfig = config => {
  createConfigIfNotExists();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
};

const createConfigIfNotExists = () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    try {
      fs.writeFileSync(CONFIG_PATH, "{}", { flag: "w+" });
      console.log(`Config file created at ${CONFIG_PATH}`);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = { CONFIG_PATH, getConfig, storeConfig };
