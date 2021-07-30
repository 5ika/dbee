const remove = require("../../libs/config/remove");

const removeS3 = params => {
  const { s3Name } = params;
  remove("s3", s3Name);
  console.log(`S3 server ${s3Name} removed from config`);
};

module.exports = removeS3;
