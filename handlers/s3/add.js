const store = require("../../libs/config/store");

const addS3 = params => {
  const { s3Name, host, accessKey, secretKey, useSSL, port, bucket } = params;
  console.log(params);
  store("s3", s3Name, { host, accessKey, secretKey, useSSL, port, bucket });
  console.log(`S3 server ${s3Name} saved in config`);
};

module.exports = addS3;
