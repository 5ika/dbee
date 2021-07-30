const { getConfig, storeConfig } = require("./_utils");

const store = (type, name, content) => {
  let config = getConfig();

  if (config[type]) {
    config[type] = { ...config[type], [name]: content };
  } else config = { ...config, [type]: { [name]: content } };

  storeConfig(config);
};

module.exports = store;
