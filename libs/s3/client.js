const Minio = require("minio");
const chalk = require("chalk");

module.exports = s3Config => {
  const minio = getMinioClient(s3Config);

  return {
    push: push(minio, s3Config),
    pull: pull(minio, s3Config),
    list: list(minio, s3Config),
    remove: remove(minio, s3Config),
  };
};

const getMinioClient = s3Config =>
  new Minio.Client({
    endPoint: s3Config.host,
    port: s3Config.port,
    useSSL: s3Config.useSSL,
    accessKey: s3Config.accessKey,
    secretKey: s3Config.secretKey,
  });

const push = (minio, s3Config) => async ({ dumpPath, fileName }) => {
  await upsertBucket(minio, s3Config);
  return minio.fPutObject(s3Config.bucket, fileName, dumpPath);
};

const pull = (minio, s3Config) => async ({ dumpPath, fileName }) =>
  minio.fGetObject(s3Config.bucket, fileName, dumpPath);

const list = (minio, s3Config) => async () => {
  await upsertBucket(minio, s3Config);
  return new Promise((resolve, reject) => {
    const stream = minio.listObjectsV2(s3Config.bucket);
    let files = [];
    stream.on("data", obj => files.push(obj));
    stream.on("end", () => resolve(files));
    stream.on("error", reject);
  });
};

const remove = (minio, s3Config) => async fileName =>
  minio.removeObject(s3Config.bucket, fileName);

const upsertBucket = async (minio, s3Config) => {
  const bucketExists = await minio.bucketExists(s3Config.bucket);

  if (!bucketExists) {
    await minio.makeBucket(s3Config.bucket);
    console.log(chalk.blue(`Bucket ${s3Config.bucket} created on S3 server`));
  }
};
