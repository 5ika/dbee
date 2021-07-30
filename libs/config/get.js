const { getConfig } = require("./_utils");
const _get = require("lodash/get");

const get = objectPath => {
  const config = getConfig();
  return _get(config, objectPath);
};

module.exports = get;
