const getConfig = require("../../libs/config/get");

const getS3Config = s3Name => {
  const s3Servers = getConfig(`s3`);

  if (s3Servers[s3Name]) return { ...s3Servers[s3Name], name: s3Name };

  const serverNames = Object.keys(s3Servers);
  const serversCount = serverNames.length;
  if (serversCount === 1)
    return { ...s3Servers[serverNames[0]], name: serverNames[0] };

  throw new Error(`No S3 server corresponding to '${s3Servers}' in config.`);
};

module.exports = getS3Config;
