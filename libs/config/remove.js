const _unset = require("lodash/unset");
const { getConfig, storeConfig } = require("./_utils");

const store = (type, name) => {
  let config = getConfig();
  _.unset(config, `${type}.${name}`);
  storeConfig(config);
};

module.exports = store;
